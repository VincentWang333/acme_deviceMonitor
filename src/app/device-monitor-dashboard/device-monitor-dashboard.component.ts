import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-device-monitor-dashboard',
  templateUrl: './device-monitor-dashboard.component.html',
  styleUrls: ['./device-monitor-dashboard.component.scss']
})
export class DeviceMonitorDashboardComponent implements OnInit {
  eventsSubject: Subject<string> = new Subject<string>();
  
  constructor() {}
  
  ngOnInit(): void {}

  typeCarSelected(){
    this.emitEventToChildComp("CAR")
  }

  typeFridgeSelected(){
    this.emitEventToChildComp("FRIDGE")
  }

  allDeviceSelected(){
    this.emitEventToChildComp("ALL");
  }

  emitEventToChildComp(data:any){
    this.eventsSubject.next(data);
  }

}
