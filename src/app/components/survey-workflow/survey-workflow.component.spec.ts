import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyWorkflowComponent } from './survey-workflow.component';

describe('SurveyWorkflowComponent', () => {
  let component: SurveyWorkflowComponent;
  let fixture: ComponentFixture<SurveyWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
