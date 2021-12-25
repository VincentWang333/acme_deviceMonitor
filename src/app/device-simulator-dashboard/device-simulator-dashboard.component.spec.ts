import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSimulatorDashboardComponent } from './device-simulator-dashboard.component';

describe('DeviceSimulatorDashboardComponent', () => {
  let component: DeviceSimulatorDashboardComponent;
  let fixture: ComponentFixture<DeviceSimulatorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceSimulatorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceSimulatorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
