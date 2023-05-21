import {Component, Inject, OnInit} from '@angular/core';
import {Appointment, Service} from "../appointment.model";
import {AppointmentRestService} from "../appointment-rest.service";
import {INavigationService, NAVIGATION_SERVICE} from "../../commons/navigation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit{
  appointment: Appointment = new Appointment();
  existingServices: Array<Service> = new Array<Service>();

  constructor(private appointmentRestService: AppointmentRestService, @Inject(NAVIGATION_SERVICE) private navigationService: INavigationService, private route: ActivatedRoute) {
    this.appointmentRestService = appointmentRestService;
  }

  ngOnInit(): void {
    this.getServices();
    this.route.queryParams.subscribe(params => {
      const newService: Service = params['newService'];
      if (newService) {
        this.existingServices.push(newService);
      }
    });
  }


  private getServices() {
    this.appointmentRestService.getServicesList().subscribe(
      data => {
        this.existingServices = data;
      }
    );
  }

  goToAppointmentList(): Promise<boolean> {
    return this.navigationService.openAppointmentList();
  }

  onSubmit() {
    this.appointment.services = this.existingServices.filter(service => service.selected);
    this.appointmentRestService.createAppointment(this.appointment).subscribe(
      data => {
        this.goToAppointmentList();
      }
    )
  }

  goToServiceForm(): Promise<boolean> {
    return this.navigationService.openAddService();
  }
}
