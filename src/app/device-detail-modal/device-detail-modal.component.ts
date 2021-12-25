import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-device-detail-modal',
  templateUrl: './device-detail-modal.component.html',
  styleUrls: ['./device-detail-modal.component.scss']
})
export class DeviceDetailModalComponent implements OnInit {
  @Input() deviceStateData:any;
  constructor() { }

  ngOnInit(): void {
    
  }

  deviceIsCar():boolean{
    return (this.deviceStateData.device_type === "CAR")
  }

  deviceIsFridge():boolean{
    return (this.deviceStateData.device_type === "FRIDGE")
  }


}
