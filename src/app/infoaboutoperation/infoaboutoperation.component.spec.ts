import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoaboutoperationComponent } from './infoaboutoperation.component';

describe('InfoaboutoperationComponent', () => {
  let component: InfoaboutoperationComponent;
  let fixture: ComponentFixture<InfoaboutoperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoaboutoperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoaboutoperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
