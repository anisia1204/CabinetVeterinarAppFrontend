import {Component, Inject, OnInit} from '@angular/core';
import {Appointment, Service, StatusType} from "../appointment.model";
import {INavigationService, NAVIGATION_SERVICE} from "../../commons/navigation.service";
import {AppointmentRestService} from "../appointment-rest.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css']
})
export class UpdateAppointmentComponent implements OnInit{
  appointment: Appointment = new Appointment();
  existingServices: Array<Service> = new Array<Service>();
  allServices: Array<Service> = new Array<Service>();
  appointmentId: number = 0;
  statusTypes: Array<StatusType> = new Array<StatusType>

  constructor(@Inject(NAVIGATION_SERVICE) private navigationService: INavigationService, private appointmentRestService: AppointmentRestService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getStatusTypes();
    this.appointmentId = this.route.snapshot.params['id']

    this.appointmentRestService.getServicesList().subscribe(
      data => {
        this.allServices = data;
      }
    );

    this.getAppointmentById(this.appointmentId);

    this.allServices.forEach(service => {
      const existingService = this.existingServices.find(s => s.id === service.id);
      service.selected = !!existingService;
    });

  }

  private getAppointmentById(id: number) {
    this.appointmentRestService.getAppointmentById(id).subscribe(
      data => {
        this.appointment = data;
        this.existingServices = data['services'];
        this.existingServices.forEach(s => s.selected = true);
        this.allServices.forEach(s => this.existingServices.forEach(s1 => {
            if(s1.id == s.id)
              s.selected = s1.selected;

          }
        ))
      }
    );
  }

  onSubmit() {
    const selectedServices = this.existingServices.filter(s => s.selected);
    this.appointment.services = [...selectedServices];
    this.appointmentRestService.updateAppointment(this.appointmentId, this.appointment).subscribe(
      data => {
        this.navigationService.openAppointmentList();
      });

  }

  private getStatusTypes() {
    this.appointmentRestService.getStatusTypesList().subscribe(
      data => {
        this.statusTypes = data;
        console.log(this.statusTypes);
      }
    );
  }

  isServiceSelected(service: Service):boolean {
    return this.existingServices.some(s => s.id === service.id && s.selected);
  }

  toggleServiceSelection(service: Service): void {
    const selectedService = this.existingServices.find(s => s.id === service.id);
    if (selectedService) {
      selectedService.selected = !selectedService.selected;
    }else {
      service.selected = true;
    }
  }

}
