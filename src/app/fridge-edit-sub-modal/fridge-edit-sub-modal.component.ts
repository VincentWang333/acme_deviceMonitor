import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fridge-edit-sub-modal',
  templateUrl: './fridge-edit-sub-modal.component.html',
  styleUrls: ['./fridge-edit-sub-modal.component.scss']
})
export class FridgeEditSubModalComponent implements OnInit {
  private eventsSubscription: Subscription = new Subscription;
  @Input() events!: Observable<void>;
  @Input() newDevice: boolean = false;
  @Input() deviceStateData: any;
  @Output() sendDataBackToMainModal = new EventEmitter<any>();
  constructor() { }

  WaterLeak:String = "";
  IceLevel:String = "";

  ngOnInit(): void {
    if(!this.newDevice){
      this.WaterLeak = this.deviceStateData.water_leak;
      this.IceLevel = this.deviceStateData.ice_level;
    }
    this.eventsSubscription = this.events.subscribe(() => {
      let data = {
        'water_leak': this.WaterLeak,
        'ice_level': this.IceLevel
      }
      this.sendDataBackToMainModal.emit(data)
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

}
