import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-device-simulator-dashboard',
  templateUrl: './device-simulator-dashboard.component.html',
  styleUrls: ['./device-simulator-dashboard.component.scss']
})
export class DeviceSimulatorDashboardComponent implements OnInit {
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
