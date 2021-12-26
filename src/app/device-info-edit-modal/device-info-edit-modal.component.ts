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
  @Output() dataTransferComplete = new EventEmitter<string>();
  
  DeviceID:string = "";
  DeviceType:string = "";
  DeviceLocationLongtitude:number = 0;
  DeviceLocationLatitude:number = 0;
  errorField:boolean = false;
  errorFieldMessage: string = ""

  deviceTypeList = ["CAR", "FRIDGE"]
  newDeviceTypeTable = new Map<string, boolean>([
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

  onChange(value:string){
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
    if (this.dataFieldErrorCheck()){
      this.emitEventToSupModal();
    }
  }

  emitEventToSupModal(){
    this.eventsSubject.next();
  }

  updateClick(){
    if (this.dataFieldErrorCheck()){
      this.emitEventToSupModal();
    }
  }

  deleteClick(){
    this.service.deleteDevice(this.DeviceID).subscribe(
      (res: any) => {
        this.dataTransferComplete.emit("Device Deleted");
      },
      (error:any) => {
        this.errorField = true;
        this.errorFieldMessage = "Failed to delete device from database, Please try again later"
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
        this.errorFieldMessage = "Failed to add new device to database, Please try again later"
      }
    );
  }

  updateDeviceData(deviceID: string, deviceStateData:any){
    this.service.updateDeviceState(deviceID, deviceStateData).subscribe(
      (res:any) => {
        this.dataTransferComplete.emit("Device State Updated");
      },
      (error:any) => {
        this.errorField = true;
        this.errorFieldMessage = "Failed to update new device to database, Please try again later"
      }
    )
  }

  dataFieldErrorCheck():boolean{
    this.errorField = false;
    this.errorFieldMessage = "";
    if (!this.deviceTypeList.includes(this.DeviceType)){
      this.errorField = true;
      this.errorFieldMessage = "Error! Please select a valid type device"
      return false;
    } else if (this.DeviceLocationLatitude > 999 || this.DeviceLocationLatitude < -999 || this.DeviceLocationLongtitude > 999 || this.DeviceLocationLongtitude < -999){
      this.errorField = true;
      this.errorFieldMessage = "Error! Integer part for location value has no more than 3 digits"
      return false;
    } else if (this.countDecimals(this.DeviceLocationLatitude) > 6 || this.countDecimals(this.DeviceLocationLongtitude) > 6){
      this.errorField = true;
      this.errorFieldMessage = "Error! Decimal part for location value has no more than 6 digits"
      return false;
    }
    return true; 
  }

  countDecimals (value:number) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
}
}
