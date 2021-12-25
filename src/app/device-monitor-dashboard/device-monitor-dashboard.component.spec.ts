import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMonitorDashboardComponent } from './device-monitor-dashboard.component';

describe('DeviceMonitorDashboardComponent', () => {
  let component: DeviceMonitorDashboardComponent;
  let fixture: ComponentFixture<DeviceMonitorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceMonitorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMonitorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
