import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsComponent } from './questions.component';
import { DataService } from '../../services/data.service';
import { ProgressComponent } from '../progress/progress.component';
import { NgTemplateOutlet } from '@angular/common';
import { QuestionDirective } from '../../directives/question.directive';
import { Question } from '../../models/question.model';
import { effect } from '@angular/core';

describe('QuestionsComponent', () => {
  let dataServiceMock: Partial<DataService>;
  let fixture: ComponentFixture<QuestionsComponent>;
  let component: QuestionsComponent;

  beforeEach(async () => {
    dataServiceMock = {
      getQuizz: jest.fn().mockReturnValue(() => ({
        questions: [
          { id: 1, text: 'Question 1' },
          { id: 2, text: 'Question 2' }
        ]
      })),
      getStep: jest.fn().mockReturnValue(() => 0)
    };

    await TestBed.configureTestingModule({
      imports: [NgTemplateOutlet, QuestionDirective, ProgressComponent, QuestionsComponent],
      providers: [{ provide: DataService, useValue: dataServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
  });

  it('should create the questions component', () => {
    expect(component).toBeTruthy();
  });

  it('should get the current question from the data service', () => {
    fixture.detectChanges();
    expect(component.question).toEqual({ id: 1, text: 'Question 1' });
  });

  it('should update the question when the step changes', () => {
    (dataServiceMock.getStep as jest.Mock).mockReturnValueOnce(() => 1);
    fixture.detectChanges();

    effect(() => {
      expect(component.question).toEqual({ id: 2, text: 'Question 2' });
    });
  });

  it('should handle no questions gracefully', () => {
    (dataServiceMock.getQuizz as jest.Mock).mockReturnValue(() => ({ questions: [] }));
    fixture.detectChanges();

    effect(() => {
      expect(component.question).toEqual({} as Question);
    });
  });

  it('should render the ProgressComponent', () => {
    fixture.detectChanges();
    const progressElement = fixture.nativeElement.querySelector('app-progress');
    expect(progressElement).toBeTruthy();
  });

  it('should render the question directive', () => {
    fixture.detectChanges();
    const questionDirectiveElement = fixture.nativeElement.querySelector('[appQuestion]');
    expect(questionDirectiveElement).toBeTruthy();
  });
});
