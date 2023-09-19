import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientinfoFaqComponent } from './patientinfo-faq.component';

describe('PatientinfoFaqComponent', () => {
  let component: PatientinfoFaqComponent;
  let fixture: ComponentFixture<PatientinfoFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientinfoFaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientinfoFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
