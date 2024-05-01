import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralPetIssue } from '../../models/GeneralPetIssue';
import { Veterinarian } from '../../models/Veterinarian';
import { PetParent } from '../../models/PetParent';
import { Pet } from '../../models/Pet';
import { AppointmentDetail } from '../../models/AppointmentDetail';

@Injectable({
  providedIn: 'root'
})
export class AppointmentFormService {

  constructor(private backendClient:HttpClient) { }
  private generalPetIssuesUrl = 'https://localhost:44327/api/AppointmentDetails/GeneralPetIssues';
  private myJsonServerUrl='http://localhost:3000/';
  private postAppointmentUrl="https://localhost:44327/api/Appointment";
  private getScheduleSlotsUrl="https://localhost:44327/api/AppointmentDetails/schedules/";
  private getAppointmentByIdUrl='https://localhost:44327/api/Appointment/';

  getGeneralPetIssues():Observable<GeneralPetIssue[]>{
    return this.backendClient.get<GeneralPetIssue[]>(this.generalPetIssuesUrl);
  }

  getVeternarians():Observable<Veterinarian[]>{
    return this.backendClient.get<Veterinarian[]>(this.myJsonServerUrl+"Veterinarians");
  }

  getPetParents():Observable<PetParent[]>{
    return this.backendClient.get<PetParent[]>(this.myJsonServerUrl+"PetParents");
  }

  getPets():Observable<Pet[]>{
    return this.backendClient.get<Pet[]>(this.myJsonServerUrl+"Pets");
  }

  getScheduleSlotStatuses(id:number,schDate:Date):Observable<boolean[]>{
    const formattedDate = schDate.toISOString().split('T')[0];
    //alert(this.getScheduleSlotsUrl+id+"/"+formattedDate);
    let x = this.backendClient.get<boolean[]>(this.getScheduleSlotsUrl+id+"/"+formattedDate);
    return x;
  }

  postAppointment(appointment:AppointmentDetail):Observable<AppointmentDetail>{ 
    return this.backendClient.post<AppointmentDetail>(this.postAppointmentUrl,appointment);
  }

  getAppointmentById(AppointmentID:number):Observable<AppointmentDetail>{
    return this.backendClient.get<AppointmentDetail>(this.getAppointmentByIdUrl+AppointmentID);
  }
}
