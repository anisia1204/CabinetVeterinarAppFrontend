import {Injectable, Provider} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Appointment, Service, StatusType} from "./appointment.model";

@Injectable({
  providedIn: "root"
})
export class AppointmentRestService {

  private url: string = "http://localhost:7777";
  constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getAppointmentList(page: number): Observable<any>  {
    return this.httpClient.get<any>(`${this.url}` + "/appointments" + '/all?page=' + `${page}` + '&size=5');
  }

  getServicesList(): Observable<Array<Service>>  {
    return this.httpClient.get<Array<Service>>(`${this.url}` + "/services/all");
  }

  getStatusTypesList(): Observable<Array<StatusType>>  {
    return this.httpClient.get<Array<StatusType>>(`${this.url}` + "/appointments/statusTypes");
  }

  updateAppointment(id: number, appointment: Appointment): Observable<Appointment>{
    return this.httpClient.put<Appointment>(`${this.url}` + "/appointments/all/" + `${id}`, appointment);
  }

  getAppointmentById(id: number) :Observable<Appointment>{
    return this.httpClient.get<Appointment>(`${this.url}` + "/appointments/all/" + `${id}`);
  }

  createService(service: Service): Observable<Service> {
    console.log(service);
    return this.httpClient.post<Service>(`${this.url}` + "/services/all", service);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.post<Appointment>(`${this.url}` + "/appointments/all", appointment);
  }

  getAppointmentsByDoctor(doctor: string):Observable<Array<Appointment>> {
    const params = new HttpParams().set('doctor', doctor);
    return this.httpClient.get<Array<Appointment>>(`${this.url}` + "/appointments/all/filteredByDoctor", {params});
  }
}
