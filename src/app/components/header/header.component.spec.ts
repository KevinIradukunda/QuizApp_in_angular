import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ModeButtonComponent } from '../mode-button/mode-button.component';
import { ModeService } from '../../services/mode.service';

describe('HeaderComponent', () => {
  let modeServiceMock: Partial<ModeService>;
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;

  beforeEach(async () => {
    modeServiceMock = {
      changeMode: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ModeButtonComponent, HeaderComponent],
      providers: [{ provide: ModeService, useValue: modeServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should call changeMode on button click', () => {
    jest.spyOn(component.modeService, 'changeMode');

    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeTruthy();
    checkbox.click();

    expect(component.modeService.changeMode).toHaveBeenCalled();
  });

  it('should call onClick method on checkbox click', () => {
    jest.spyOn(component as any, 'onClick'); // TypeScript requires "as any" to bypass protected access

    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeTruthy();
    checkbox.click();

    expect((component as any).onClick).toHaveBeenCalled();
  });

  it('should render the ModeButtonComponent', () => {
    fixture.detectChanges();
    const modeButtonElement = fixture.nativeElement.querySelector('app-mode-button');
    expect(modeButtonElement).toBeTruthy();
  });
});
