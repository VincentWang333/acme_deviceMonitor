import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DeviceTableComponent } from './device-table/device-table.component';
import { DeviceMonitorDashboardComponent } from './device-monitor-dashboard/device-monitor-dashboard.component';
import { DeviceSimulatorDashboardComponent } from './device-simulator-dashboard/device-simulator-dashboard.component';
import { DeviceDetailModalComponent } from './device-detail-modal/device-detail-modal.component';
import { DeviceInfoEditModalComponent } from './device-info-edit-modal/device-info-edit-modal.component';
import {FormsModule} from '@angular/forms';
import { CarEditSubModalComponent } from './car-edit-sub-modal/car-edit-sub-modal.component';
import { FridgeEditSubModalComponent } from './fridge-edit-sub-modal/fridge-edit-sub-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceTableComponent,
    DeviceMonitorDashboardComponent,
    DeviceSimulatorDashboardComponent,
    DeviceDetailModalComponent,
    DeviceInfoEditModalComponent,
    CarEditSubModalComponent,
    FridgeEditSubModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
