import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000/api/v1/appointments/';
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
