import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceMonitorDashboardComponent } from './device-monitor-dashboard/device-monitor-dashboard.component';
import { DeviceSimulatorDashboardComponent } from './device-simulator-dashboard/device-simulator-dashboard.component';
const routes: Routes = [
  {
    path: 'monitor',
    component: DeviceMonitorDashboardComponent,
  },{
    path: 'simulator',
    component: DeviceSimulatorDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
