import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-car-edit-sub-modal',
  templateUrl: './car-edit-sub-modal.component.html',
  styleUrls: ['./car-edit-sub-modal.component.scss']
})
export class CarEditSubModalComponent implements OnInit {
  private eventsSubscription: Subscription = new Subscription;
  @Input() events!: Observable<void>;
  @Input() newDevice: boolean = false;
  @Input() deviceStateData: any;
  @Output() sendDataBackToMainModal = new EventEmitter<any>();
  FluidLevel:string = "";
  EngineTemperature: number = 0;
  TirePressure: number = 0;


  constructor() {}



  ngOnInit(): void {
    if (!this.newDevice){
      this.FluidLevel = this.deviceStateData.fluid_level;
      this.EngineTemperature = this.deviceStateData.engine_temp;
      this.TirePressure = this.deviceStateData.tire_pressure;
    }
    this.eventsSubscription = this.events.subscribe(() => {
      let data = {
        'fluid_level': this.FluidLevel,
        'engine_temp': this.EngineTemperature,
        'tire_pressure': this.TirePressure
      }
      this.sendDataBackToMainModal.emit(data)
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

}
