import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { SolutionsComponent } from './components/solutions/solutions.component';
import { ModeService } from './services/mode.service';

describe('AppComponent', () => {
  let modeServiceMock: Partial<ModeService>;

  beforeEach(async () => {
    modeServiceMock = {
      getMode: jest.fn().mockReturnValue('testMode') // Ensure the mock returns a value
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterOutlet, HeaderComponent, QuestionsComponent, SolutionsComponent, AppComponent],
      providers: [{ provide: ModeService, useValue: modeServiceMock }]
    }).compileComponents();
  });

  it('should create the app component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have mode set from the service', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.mode).toBe('testMode');
  });

  it('should render the HeaderComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const headerElement = fixture.nativeElement.querySelector('app-header');
    expect(headerElement).toBeTruthy();
  });

  it('should render the QuestionsComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const questionsElement = fixture.nativeElement.querySelector('app-questions');
    expect(questionsElement).toBeTruthy();
  });

  it('should render the SolutionsComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const solutionsElement = fixture.nativeElement.querySelector('app-solutions');
    expect(solutionsElement).toBeTruthy();
  });
});
