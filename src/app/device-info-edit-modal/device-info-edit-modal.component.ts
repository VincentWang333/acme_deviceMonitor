import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-device-info-edit-modal',
  templateUrl: './device-info-edit-modal.component.html',
  styleUrls: ['./device-info-edit-modal.component.scss']
})
export class DeviceInfoEditModalComponent implements OnInit {
  constructor(private service:SharedService) { }
  @Input() newDevice:boolean = false;
  @Input() deviceStateData:any;
  @Output() dataTransferComplete = new EventEmitter<String>();
  
  DeviceID:String = "";
  DeviceType:String = "";
  DeviceLocationLongtitude:number = 0;
  DeviceLocationLatitude:number = 0;
  errorField:boolean = false;

  deviceTypeList = ["CAR", "FRIDGE"]
  newDeviceTypeTable = new Map<String, boolean>([
    ["CAR", false], 
    ["FRIDGE", false]
  ]);

  eventsSubject: Subject<void> = new Subject<void>();

  
  ngOnInit(): void {
    if(!this.newDevice){
      this.DeviceID = this.deviceStateData.track_id;
      this.DeviceType = this.deviceStateData.device_type;
      this.DeviceLocationLongtitude = this.deviceStateData.loc_lng;
      this.DeviceLocationLatitude = this.deviceStateData.loc_lat;
    }
  }

  editDeviceIsCar():boolean{
    return (this.deviceStateData.device_type === "CAR")
  }

  editDeviceIsFridge():boolean{
    return (this.deviceStateData.device_type === "FRIDGE")
  }

  newDeviceIsCar(){
    return this.newDeviceTypeTable.get('CAR');
  }

  newDeviceIsFridge(){
    return this.newDeviceTypeTable.get('FRIDGE');
  }

  onChange(value:String){
    this.initDeviceTypeTable();
    switch(value){
      case "CAR":
        this.newDeviceTypeTable.set(value, true);
        break;
      case "FRIDGE":
        this.newDeviceTypeTable.set(value, true);
        break;
    }
  }

  initDeviceTypeTable(){
    for (let deviceType of this.newDeviceTypeTable.keys()){
      this.newDeviceTypeTable.set(deviceType, false);
    }
  }

  addClick(){
    this.errorField = false;
    if (this.DeviceType.length < 1){
      this.errorField = true;
    } else {
      this.emitEventToSupModal();
    }
  }

  emitEventToSupModal(){
    this.eventsSubject.next();
  }

  updateClick(){
    this.emitEventToSupModal();
  }

  deleteClick(){
    this.service.deleteDevice(this.DeviceID).subscribe(
      (res: any) => {
        this.dataTransferComplete.emit("Device Deleted");
      },
      (error:any) => {
        this.errorField = true;
      }
    )
  }

  sendCollectedData(data:any){
    let commonData = {
      "track_id": this.DeviceID,
      "loc_lat": this.DeviceLocationLatitude,
      "loc_lng":this.DeviceLocationLongtitude,
      "device_type":this.DeviceType,
    }
    let deviceData = {...data,  ...commonData};
    if(this.newDevice){
      this.addNewDevice(deviceData);
    } else {
      this.updateDeviceData(this.DeviceID, deviceData);
    }
  }


  addNewDevice(deviceStateData:any){
    this.service.addNewDevice(deviceStateData).subscribe(
      (res: any) => {
        this.dataTransferComplete.emit("New device added");
      },
      (error:any) => {
        this.errorField = true;
      }
    );
  }

  updateDeviceData(deviceID: String, deviceStateData:any){
    this.service.updateDeviceState(deviceID, deviceStateData).subscribe(
      (res:any) => {
        this.dataTransferComplete.emit("Device State Updated");
      },
      (error:any) => {
        this.errorField = true;
      }
    )
  }
}
