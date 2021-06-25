import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { Question } from 'src/app/models/question.model';
import { Answer } from 'src/app/models/answer.model';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-survey-workflow',
  templateUrl: './survey-workflow.component.html',
  styleUrls: ['./survey-workflow.component.css']
})
export class SurveyWorkflowComponent implements OnInit {

  questions?: Question[];
  answerDict: { [id: number] : Answer; } = {};
  survey?: Survey = {
    title: '',
    description: '',
    count: 0
  }
  title?: string = ""
  test?: string[] = ["a", "b", "c", "d"]

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.retrieveSurveyById(this.route.snapshot.params.id)
    this.retrieveSurveyQuestions(this.route.snapshot.params.id);
  }

  openSnackBar(message: string, action: string, duration?: number) {
    this._snackBar.open(message, action, {duration});
  }

  retrieveSurveyById(id: string): void {
    this.surveyService.getSurveyById(id)
      .subscribe(
        data => {
          this.survey = data;
          this.title = this.survey.title
        },
        error => {
          console.log(error);
        });
  }

  retrieveSurveyQuestions(id: string): void {
    this.surveyService.getAllQuestionsBySurvey(id)
      .subscribe(
        data => {
          this.questions = data;
        },
        error => {
          console.log(error);
        });
  }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    let key = parseInt(target.name);
    let value = target.value;
    let type = target.type;
    if(type === "checkbox" && this.answerDict[key]) {
      if(!this.answerDict[key].text?.includes(value)) {
        this.answerDict[key] = {
          text: this.answerDict[key].text+","+value,
          questionId: key,
          type: type
        }
      } else {
        let answers = this.answerDict[key].text?.split(",");
        answers = answers?.filter(ans => ans !== value);
        this.answerDict[key] = {
          text: answers?.join(),
          questionId: key,
          type: type
        }
      }
    } else {
      this.answerDict[key] = {
        text: target.value,
        questionId: key,
        type: type
      }
    }
  }

  submitSurvey(): void {
    for (const [key, value] of Object.entries(this.answerDict)) {
      let payload = value;
      if(payload.type !== "checkbox") {
        this.surveyService.addAnswer(payload)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          });
      } else {
        let answers = value.text?.split(",");
        answers?.forEach(ans => {
          let data = {
            text: ans,
            questionId: payload.questionId,
            type: payload.type
          }
          this.surveyService.addAnswer(data)
          .subscribe(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            });
        });
      }
    }
    this.updateTotalSurveyCount();
  }

  updateTotalSurveyCount(): void {
    if(Object.entries(this.answerDict).length !== 0) {
      this.surveyService.updateTotalSurveyCount(this.route.snapshot.params.id)
      .subscribe(
        () => {
          this.router.navigate(['/'])
            .then((navigated: boolean) => {
              if(navigated) {
                this.openSnackBar("Survey Submitted", "Close", 3000)
              }
      });
        },
        error => {
          console.log(error);
        });
    }
  }

  back(): void {
    this.router.navigateByUrl('/');
  }
}
