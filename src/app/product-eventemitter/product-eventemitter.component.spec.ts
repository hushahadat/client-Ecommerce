import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEventemitterComponent } from './product-eventemitter.component';

describe('ProductEventemitterComponent', () => {
  let component: ProductEventemitterComponent;
  let fixture: ComponentFixture<ProductEventemitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEventemitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEventemitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
