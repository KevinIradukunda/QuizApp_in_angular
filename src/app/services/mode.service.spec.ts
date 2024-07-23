import { TestBed } from '@angular/core/testing';
import { ModeService } from './mode.service';
import { WritableSignal, signal } from '@angular/core';

describe('ModeService', () => {
  let service: ModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial mode as light', () => {
    const modeSignal: WritableSignal<string> = service.getMode();
    expect(modeSignal()).toBe('light');
  });

  it('should change mode from light to dark', () => {
    service.changeMode();
    const modeSignal: WritableSignal<string> = service.getMode();
    expect(modeSignal()).toBe('dark');
  });

  it('should change mode from dark to light', () => {
    // First change to dark
    service.changeMode();
    // Change back to light
    service.changeMode();
    const modeSignal: WritableSignal<string> = service.getMode();
    expect(modeSignal()).toBe('light');
  });
});
