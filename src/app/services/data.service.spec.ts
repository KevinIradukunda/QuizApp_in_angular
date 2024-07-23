import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import data from '../../assets/data.json';
import { Quizz } from '../models/question.model';
import { WritableSignal } from '@angular/core';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial data', () => {
    expect(service.getData()).toEqual(data.quizzes);
  });

  it('should return initial step as 0', () => {
    const stepSignal: WritableSignal<number> = service.getStep();
    expect(stepSignal()).toBe(0);
  });

  it('should increment step', () => {
    service.addStep();
    const stepSignal: WritableSignal<number> = service.getStep();
    expect(stepSignal()).toBe(1);
  });

  it('should return initial quizz as empty object', () => {
    const quizzSignal: WritableSignal<Quizz> = service.getQuizz();
    expect(quizzSignal()).toEqual({});
  });

  it('should set quizz correctly', () => {
    service.setQuizz(0);
    const quizzSignal: WritableSignal<Quizz> = service.getQuizz();
    expect(quizzSignal()).toEqual(data.quizzes[0]);
  });

  it('should initialize data correctly', () => {
    service.setQuizz(0);
    service.addStep();
    service.setTestFinished();

    service.initializeData();

    const stepSignal: WritableSignal<number> = service.getStep();
    const testFinishedSignal: WritableSignal<boolean> = service.getTestFinished();
    const quizzSignal: WritableSignal<Quizz> = service.getQuizz();

    expect(stepSignal()).toBe(0);
    expect(testFinishedSignal()).toBe(false);
    expect(quizzSignal()).toEqual({});
  });

  it('should return initial testFinished as false', () => {
    const testFinishedSignal: WritableSignal<boolean> = service.getTestFinished();
    expect(testFinishedSignal()).toBe(false);
  });

  it('should toggle testFinished', () => {
    service.setTestFinished();
    let testFinishedSignal: WritableSignal<boolean> = service.getTestFinished();
    expect(testFinishedSignal()).toBe(true);

    service.setTestFinished();
    testFinishedSignal = service.getTestFinished();
    expect(testFinishedSignal()).toBe(false);
  });
});
