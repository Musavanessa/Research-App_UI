import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }
  apiUrl = url;
  createApppoitment(appointment:any):Observable<any>
  {
    return this.http.post(`${this.apiUrl + appointment.projectId}`, appointment);
  }
  getAppointments(id:any):Observable<any>
  {
    return this.http.get(`${this.apiUrl + id}`);
  } 

  updateAppointment(appointment:any):Observable<any>
  {
    return this.http.patch(`${this.apiUrl + appointment.id}`, appointment);
  }



}
