import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarEditSubModalComponent } from './car-edit-sub-modal.component';

describe('CarEditSubModalComponent', () => {
  let component: CarEditSubModalComponent;
  let fixture: ComponentFixture<CarEditSubModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarEditSubModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarEditSubModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
