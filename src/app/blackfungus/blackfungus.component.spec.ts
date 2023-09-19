import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackfungusComponent } from './blackfungus.component';

describe('BlackfungusComponent', () => {
  let component: BlackfungusComponent;
  let fixture: ComponentFixture<BlackfungusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackfungusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackfungusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
