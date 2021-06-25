import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyManagerHomeComponent } from './components/survey-manager-home/survey-manager-home.component';
import { SurveyWorkflowComponent } from './components/survey-workflow/survey-workflow.component';
import { SurveyStatisticsComponent } from './components/survey-statistics/survey-statistics.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: '', redirectTo: 'surveys', pathMatch: 'full' },
  { path: 'surveys', component: SurveyManagerHomeComponent, canActivate: [AuthGuard], },
  { path: 'surveys/:id', component: SurveyWorkflowComponent, canActivate: [AuthGuard], },
  { path: 'stats/:id', component: SurveyStatisticsComponent, canActivate: [AuthGuard], }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
