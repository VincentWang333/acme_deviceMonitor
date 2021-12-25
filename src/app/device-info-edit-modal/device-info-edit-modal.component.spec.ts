import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInfoEditModalComponent } from './device-info-edit-modal.component';

describe('DeviceInfoEditModalComponent', () => {
  let component: DeviceInfoEditModalComponent;
  let fixture: ComponentFixture<DeviceInfoEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceInfoEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInfoEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
