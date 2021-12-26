import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = "http://127.0.0.1:8000"; 

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  constructor(private http:HttpClient) {}

  getDeviceList():Observable<any[]>{
    return this.http.get<any[]>(`${baseUrl}/devices`);
  }

  getCarDeviceList():Observable<any[]>{
    return this.http.get<any[]>(`${baseUrl}/devices/cars/`);
  }

  getFridgeDeviceList():Observable<any[]>{
    return this.http.get<any[]>(`${baseUrl}/devices/fridges/`);
  }

  getDeviceStateInfo(track_id:any){
    return this.http.get(`${baseUrl}/devices/${track_id}`);
  }

  addNewDevice(data:any){
    return this.http.post(`${baseUrl}/devices/`, data);
  }

  deleteDevice(track_id:string){
    return this.http.delete(`${baseUrl}/devices/${track_id}`);
  }

  updateDeviceState(track_id:string, data:any){
    return this.http.patch(`${baseUrl}/devices/${track_id}`, data);
  }


}
