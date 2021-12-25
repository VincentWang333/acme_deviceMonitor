import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Rx from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  socket:any
  
  constructor(){ 
    this.socket = new WebSocket('ws://localhost:8000/ws/device/');
  }

  public send(message: any){
    this.socket.send(message)
  }

  public stop(){
    this.socket.close()
  }
}
