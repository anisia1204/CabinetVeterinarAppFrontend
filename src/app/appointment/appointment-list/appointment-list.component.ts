import {Component, Inject, OnInit} from '@angular/core';
import {Appointment} from "../appointment.model";
import {AppointmentRestService} from "../appointment-rest.service";
import {INavigationService, NAVIGATION_SERVICE} from "../../commons/navigation.service";

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointments: Array<Appointment> = new Array<Appointment>();
  doctor: string = '';
  currentPage: number = 0;
  totalPages: number = 0;


  constructor(private appointmentRestService: AppointmentRestService, @Inject(NAVIGATION_SERVICE) private navigationService: INavigationService) {
    this.appointmentRestService = appointmentRestService;
  }

  ngOnInit(): void {
    this.getAppointments();
  }


  private getAppointments() {
    this.appointmentRestService.getAppointmentList(this.currentPage).subscribe(
      data => {
        this.appointments = data.content;
        this.totalPages = data.totalPages;
      }
    );
  }

  getTotalCost(appointment: Appointment): number {
    return appointment.services
      .map(service => service.price)
      .reduce((totalCostOfServices, price) => totalCostOfServices + price, 0);
  }

  updateAppointment(id: number): Promise<boolean> {
    return this.navigationService.openUpdateAppointment(id);
  }

  filterAppointments() {
    if (this.doctor) {
      this.appointmentRestService.getAppointmentsByDoctor(this.doctor)
        .subscribe(
          data => {
            this.appointments = data;
          },
          error => {
            console.error('Error filtering appointments:', error);
          }
        );
    } else {
      this.getAppointments();
    }
  }

  clearFilter() {
    this.doctor = '';
    this.getAppointments();
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAppointments();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getAppointments();
    }
  }

  isFirstPage(): boolean {
    return this.currentPage === 0;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages - 1;
  }
}
