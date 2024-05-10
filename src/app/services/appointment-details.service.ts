import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cancellation } from '../models/Cancellation';

@Injectable({
  providedIn: 'root'
})
export class AppointmentDetailsService {
  private apiUrl = 'https://petzeybackendappointmentapi20240505153736.azurewebsites.net/api/Appointment';
  private apiUrl2= 'https://petzeybackendappointmentapi20240505153736.azurewebsites.net/api/AppointmentDetails';
  private apiUrl3= 'https://petzeybackendappointmentapi20240505153736.azurewebsites.net/api/PetIdByDocId';
  private apiUrl4= 'https://petzeybackendappointmentapi20240505153736.azurewebsites.net/api/AppointmentCancellationReason'

  constructor(private http: HttpClient) { }
  GetAppointmentDetail(AppointmentID: number):Observable<any> {
    //console.log(AppointmentID+"in service"+typeof(AppointmentID))
    const url = `${this.apiUrl}/${AppointmentID}`;
    return this.http.get<any>(url);
  }
  PatchAppointmentStatus(AppointmentID: number,StatusNo:number):Observable<any>{
    const url = `${this.apiUrl2}/${AppointmentID}/status`;
    return this.http.patch(url, StatusNo);
  }
  GetAllPetIDByVetId(VetID:number):Observable<number[]>{
    const url=`${this.apiUrl3}/${VetID}`
    return this.http.get<number[]>(url);
  }
  PostCancellationReason(cancellation: Cancellation) {
    return this.http.post(
      this.apiUrl4,cancellation
    );
  }



}
