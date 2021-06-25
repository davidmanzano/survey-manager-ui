import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyManagerHomeComponent } from './survey-manager-home.component';

describe('SurveyManagerHomeComponent', () => {
  let component: SurveyManagerHomeComponent;
  let fixture: ComponentFixture<SurveyManagerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyManagerHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyManagerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
