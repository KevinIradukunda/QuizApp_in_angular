import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModeButtonComponent } from './mode-button.component';
import { Component } from '@angular/core';

describe('ModeButtonComponent', () => {
  let fixture: ComponentFixture<ModeButtonComponent>;
  let component: ModeButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModeButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create the mode button component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clickButton event on checkbox click', () => {
    jest.spyOn(component.clickButton, 'emit');

    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeTruthy();
    checkbox.click();

    expect(component.clickButton.emit).toHaveBeenCalled();
  });

  it('should call onClick method on checkbox click', () => {
    jest.spyOn(component as any, 'onClick'); // TypeScript requires "as any" to bypass protected access

    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeTruthy();
    checkbox.click();

    expect((component as any).onClick).toHaveBeenCalled();
  });

  it('should call the public wrapper method triggerClick', () => {
    jest.spyOn(component, 'triggerClick');

    component.triggerClick();

    expect(component.triggerClick).toHaveBeenCalled();
    expect(component.clickButton.emit).toHaveBeenCalled();
  });
});
