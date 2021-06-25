import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { Question } from 'src/app/models/question.model';
import { Answer } from 'src/app/models/answer.model';
import { SurveyService } from 'src/app/services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-survey-statistics',
  templateUrl: './survey-statistics.component.html',
  styleUrls: ['./survey-statistics.component.css']
})
export class SurveyStatisticsComponent implements OnInit {

  questions?: Question[];
  survey?: Survey = {
    title: '',
    description: '',
    count: 0
  };
  title?: string = "";
  surveyCount?: number;

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.retrieveSurveyById(this.route.snapshot.params.id)
    this.retrieveSurveyQuestions(this.route.snapshot.params.id);
  }

  retrieveSurveyById(id: string): void {
    this.surveyService.getSurveyById(id)
      .subscribe(
        data => {
          this.survey = data;
          this.title = this.survey.title + " Statistics"
          this.surveyCount = this.survey.count
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
          this.retrieveMostCommonAnswers(this.questions)
          this.retrieveLeastCommonAnswers(this.questions)
        },
        error => {
          console.log(error);
        });
  }

  retrieveMostCommonAnswers(questions: Question[]): void {
    for (const [key, value] of Object.entries(questions)) {
      this.surveyService.getMostCommonAnswer(value.id)
        .subscribe(
          data => {
            questions[parseInt(key)].mostCommon = "";
            for (const [i, j] of Object.entries(data)) {
              questions[parseInt(key)].mostCommon = (questions[parseInt(key)].mostCommon + ", " + (j.text));
            }
            questions[parseInt(key)].mostCommon = questions[parseInt(key)].mostCommon?.substring(1);
          },
          error => {
            console.log(error);
          });
    }
  }

  retrieveLeastCommonAnswers(questions: Question[]): void {
    for (const [key, value] of Object.entries(questions)) {
      this.surveyService.getLeastCommonAnswer(value.id)
        .subscribe(
          data => {
            questions[parseInt(key)].leastCommon = "";
            for (const [i, j] of Object.entries(data)) {
              questions[parseInt(key)].leastCommon = (questions[parseInt(key)].leastCommon + ", " + (j.text));
            }
            questions[parseInt(key)].leastCommon = questions[parseInt(key)].leastCommon?.substring(1);
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
