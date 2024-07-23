import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolutionComponent } from './solution.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('SolutionComponent', () => {
  let fixture: ComponentFixture<SolutionComponent>;
  let component: SolutionComponent;
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolutionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SolutionComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
  });

  it('should create the solution component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default variant as "none"', () => {
    fixture.detectChanges();
    expect(component.variant).toBe('none');
  });

  it('should set the variant to "correct"', () => {
    component.variant = 'correct';
    fixture.detectChanges();
    expect(component.variant).toBe('correct');
  });

  it('should set the variant to "incorrect"', () => {
    component.variant = 'incorrect';
    fixture.detectChanges();
    expect(component.variant).toBe('incorrect');
  });

  it('should have default selected as false', () => {
    fixture.detectChanges();
    expect(component.selected).toBe(false);
  });

  it('should set selected to true', () => {
    component.selected = true;
    fixture.detectChanges();
    expect(component.selected).toBe(true);
  });

  it('should apply the correct class based on variant and selected', () => {
    component.variant = 'correct';
    component.selected = true;
    fixture.detectChanges();
    const hostElement = element.nativeElement;

    expect(hostElement.classList.contains('correct')).toBe(true);
    expect(hostElement.classList.contains('selected')).toBe(true);
  });

  it('should not apply the incorrect class if variant is "none"', () => {
    component.variant = 'none';
    component.selected = true;
    fixture.detectChanges();
    const hostElement = element.nativeElement;

    expect(hostElement.classList.contains('correct')).toBe(false);
    expect(hostElement.classList.contains('incorrect')).toBe(false);
    expect(hostElement.classList.contains('selected')).toBe(true);
  });
});
