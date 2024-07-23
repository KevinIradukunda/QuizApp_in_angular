import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { QuestionDirective } from './question.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div question [question]="htmlContent"></div>`
})
class TestComponent {
  htmlContent = 'Test question content';
}

describe('QuestionDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [QuestionDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
  });

  it('should create an instance of the directive', () => {
    const directive = new QuestionDirective(fixture.debugElement.query(By.directive(QuestionDirective)).nativeElement);
    expect(directive).toBeTruthy();
  });

  it('should wrap each word in a span tag with &nbsp;', () => {
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.directive(QuestionDirective)).nativeElement;
    expect(element.innerHTML).toBe('<span>Test&nbsp;</span><span>question&nbsp;</span><span>content&nbsp;</span>');
  });

  it('should update the content when the input changes', () => {
    testComponent.htmlContent = 'Updated content for question';
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.directive(QuestionDirective)).nativeElement;
    expect(element.innerHTML).toBe('<span>Updated&nbsp;</span><span>content&nbsp;</span><span>for&nbsp;</span><span>question&nbsp;</span>');
  });
});
