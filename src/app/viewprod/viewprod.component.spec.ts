import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewprodComponent } from './viewprod.component';

describe('ViewprodComponent', () => {
  let component: ViewprodComponent;
  let fixture: ComponentFixture<ViewprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewprodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
