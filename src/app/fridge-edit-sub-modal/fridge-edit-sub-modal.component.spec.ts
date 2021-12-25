import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeEditSubModalComponent } from './fridge-edit-sub-modal.component';

describe('FridgeEditSubModalComponent', () => {
  let component: FridgeEditSubModalComponent;
  let fixture: ComponentFixture<FridgeEditSubModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FridgeEditSubModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FridgeEditSubModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
