import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-survey-manager-home',
  templateUrl: './survey-manager-home.component.html',
  styleUrls: ['./survey-manager-home.component.css']
})
export class SurveyManagerHomeComponent implements OnInit {

  surveys?: Survey[];
  currentSurvey: Survey = {};
  currentIndex = -1;
  title = '';

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.retrieveSurveys();
  }

  retrieveSurveys(): void {
    this.surveyService.getAllSurveys()
      .subscribe(
        data => {
          this.surveys = data;
        },
        error => {
          console.log(error);
        });
  }

  setActiveSurvey(survey: Survey, index: number): void {
    this.currentSurvey = survey;
    this.currentIndex = index;
  }

}
