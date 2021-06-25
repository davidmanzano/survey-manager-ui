import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey.model';
import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';

const baseUrl = 'http://localhost:8080/api/surveys';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  getAllSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(baseUrl);
  }

  getAllQuestionsBySurvey(id: any): Observable<Question[]> {
    return this.http.get<Question[]>(`${baseUrl}/${id}`);
  }

  addAnswer(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/addAnswer`, data);
  }

  getAllAnswersByQuestion(id: any): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${baseUrl}/answers/${id}`);
  }

  updateTotalSurveyCount(id: any): Observable<any> {
    return this.http.put(`${baseUrl}/updateTotalSurveys/${id}`, id);
  }

  getSurveyById(id: any): Observable<Survey> {
    return this.http.get(`${baseUrl}/retrieveSurvey/${id}`);
  }

  getMostCommonAnswer(id: any): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${baseUrl}/retrieveMostCommonAnswer/${id}`);
  }

  getLeastCommonAnswer(id: any): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${baseUrl}/retrieveLeastCommonAnswer/${id}`);
  }
}
