import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressComponent } from './progress.component';
import { By } from '@angular/platform-browser';

describe('ProgressComponent', () => {
  let fixture: ComponentFixture<ProgressComponent>;
  let component: ProgressComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
  });

  it('should create the progress component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default maxValue as 10', () => {
    fixture.detectChanges();
    expect(component.maxValue).toBe(10);
  });

  it('should have default actualValue as 0', () => {
    fixture.detectChanges();
    expect(component.actualValue).toBe(0);
  });

  it('should render maxValue and actualValue correctly', () => {
    component.maxValue = 15;
    component.actualValue = 5;
    fixture.detectChanges();
    const progressElement = fixture.debugElement.query(By.css('.progress')).nativeElement;

    expect(progressElement).toBeTruthy();
    // You can add more detailed checks depending on your actual template structure
  });

  it('should update the maxValue and actualValue dynamically', () => {
    component.maxValue = 20;
    component.actualValue = 10;
    fixture.detectChanges();
    expect(component.maxValue).toBe(20);
    expect(component.actualValue).toBe(10);
  });

  // You can add more tests to verify the rendering and behavior based on your actual template and styles
});
