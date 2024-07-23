import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolutionsComponent } from './solutions.component';
import { SolutionComponent } from './solution/solution.component';
import { DataService } from '../../services/data.service';
import { Question } from '../../models/question.model';
import { effect, signal } from '@angular/core';

describe('SolutionsComponent', () => {
  let dataServiceMock: Partial<DataService>;
  let fixture: ComponentFixture<SolutionsComponent>;
  let component: SolutionsComponent;

  beforeEach(async () => {
    dataServiceMock = {
      getData: jest.fn().mockReturnValue({}),
      getQuizz: jest.fn().mockReturnValue(() => ({
        questions: [
          { id: 1, text: 'Question 1', options: ['A', 'B', 'C', 'D'], answer: 'B' }
        ]
      })),
      getStep: jest.fn().mockReturnValue(() => 0),
      setQuizz: jest.fn(),
      addStep: jest.fn(),
      setTestFinished: jest.fn(),
      initializeData: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [SolutionComponent, SolutionsComponent],
      providers: [{ provide: DataService, useValue: dataServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(SolutionsComponent);
    component = fixture.componentInstance;
  });

  it('should create the solutions component', () => {
    expect(component).toBeTruthy();
  });

  it('should get the current question and correct answer', () => {
    fixture.detectChanges();
    expect(component.question).toEqual({ id: 1, text: 'Question 1', options: ['A', 'B', 'C', 'D'], answer: 'B' });
    expect(component.correctAnswer).toBe(1);
  });

  it('should start the quizz', () => {
    component.startQuizz(0);
    expect(dataServiceMock.setQuizz).toHaveBeenCalledWith(0);
  });

  it('should go to the next question', () => {
    (dataServiceMock.getStep as jest.Mock).mockReturnValueOnce(() => 0);
    component.nextQuestion();
    expect(dataServiceMock.addStep).toHaveBeenCalled();
    expect(component.answerSelected()).toBe(-1);
    expect(component.answerSubmitted).toBe(false);
  });

  it('should finish the test when step exceeds limit', () => {
    (dataServiceMock.getStep as jest.Mock).mockReturnValueOnce(() => 9);
    component.nextQuestion();
    expect(dataServiceMock.setTestFinished).toHaveBeenCalled();
  });

  it('should submit the answer and increment totalCorrect if answer is correct', () => {
    component.correctAnswer = 1;
    component.answerSelected.set(1);
    component.submitAnswer();
    expect(component.answerSubmitted).toBe(true);
    expect(component.totalCorrect).toBe(1);
  });

  it('should submit the answer and not increment totalCorrect if answer is incorrect', () => {
    component.correctAnswer = 1;
    component.answerSelected.set(0);
    component.submitAnswer();
    expect(component.answerSubmitted).toBe(true);
    expect(component.totalCorrect).toBe(0);
  });

  it('should return correct variant for correct answer', () => {
    component.answerSubmitted = true;
    component.correctAnswer = 1;
    expect(component.solutionVariant(1)).toBe('correct');
  });

  it('should return incorrect variant for incorrect answer', () => {
    component.answerSubmitted = true;
    component.correctAnswer = 1;
    component.answerSelected.set(0);
    expect(component.solutionVariant(0)).toBe('incorrect');
  });

  it('should return none variant if answer not submitted', () => {
    component.answerSubmitted = false;
    expect(component.solutionVariant(1)).toBe('none');
  });

  it('should handle answer click', () => {
    component.answerSelected.set(1);
    component.onClickAnswer(1);
    expect(component.answerSelected()).toBe(-1);
    component.onClickAnswer(0);
    expect(component.answerSelected()).toBe(0);
  });

  it('should reset state on playAgain', () => {
    component.playAgain();
    expect(component.answerSelected()).toBe(-1);
    expect(component.answerSubmitted).toBe(false);
    expect(dataServiceMock.initializeData).toHaveBeenCalled();
    expect(component.totalCorrect).toBe(0);
  });
});
