import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SharedService } from '../shared.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss'],
})

export class DeviceTableComponent implements OnInit {

  constructor(private service:SharedService, private websocketService:WebsocketService) {}
  private eventsSubscription: Subscription = new Subscription;
  currDeviceList:any = [];
  detailedDeviceData:any;
  @Input() isSimulator:boolean = false;
  @Input() selectedType: string = ""
  @Input() events!: Observable<string>;
  modalTitle: string = "";
  modalRelease: boolean = false;
  reviewDetailModal:boolean = false;
  editDeviceModal:boolean = false;
  addDeviceModal:boolean = false;
  notifiedModal:boolean = false;
  currentFilterType:string = "ALL";
  
  ngOnInit(): void {
    this.getDeviceList();
    this.websocketService.socket.onmessage = (event:any) => {
      let signal = JSON.parse(event.data)["text"];
      if (signal === "REFRESH"){
        this.refreshDeviceList()
      }
    }
    this.eventsSubscription = this.events.subscribe((data:string) => {
      this.currentFilterType = data;
        this.getFileterDeviceList()
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
    this.currentFilterType = "ALL";
  }

  detailClick(device_id:any){
    this.modalTitle = "Device State Detail"
    this.reviewDetailModal = true;
    this.getDeviceStateInfo(device_id);
  }

  closeClick(){
    this.refreshDeviceList();
    this.modalTitle = ""
    this.reviewDetailModal = false;
    this.editDeviceModal = false;
    this.addDeviceModal = false;
    this.modalRelease = false;
    this.notifiedModal = false;
  }

  notifyModalcloseClick(){
    this.refreshDeviceList();
  }

  refreshDeviceList(){
    this.getFileterDeviceList()
  }

  addClick(){
    this.modalTitle = "New Device (Please fill or update the info)";
    this.addDeviceModal = true;
    this.modalRelease = true;
  }

  editClick(track_id:any){
    this.modalTitle = "Update State Info"
    this.getDeviceStateInfo(track_id);
    this.editDeviceModal = true;
  }
  
  getDeviceStateInfo(track_id:any){
    this.service.getDeviceStateInfo(track_id).subscribe(
      data => {
        this.detailedDeviceData = data;
        this.modalRelease = true;
      }
    )
  }

  getDeviceList(){
    this.service.getDeviceList().subscribe(
      data => {
        this.currDeviceList = data;
      }
    )
  }

  getFileterDeviceList(){
    switch(this.currentFilterType){
      case "CAR":
        this.getCarDeviceList();
        break;
      case "FRIDGE":
        this.getFridgeDeviceList();
        break;
      default:
        this.getDeviceList();
    }
  }

  getCarDeviceList(){
    this.service.getCarDeviceList().subscribe(
      data => {
        this.currDeviceList = data;
      }
    )
  }

  getFridgeDeviceList(){
    this.service.getFridgeDeviceList().subscribe(
      data => {
        this.currDeviceList = data;
      }
    )
  }

  notifyDataTransferComplete(message:string){
    this.closeClick();
    this.modalTitle = message;
    this.notifiedModal = true;
  }
}
