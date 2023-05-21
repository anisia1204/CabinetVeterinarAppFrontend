import {Component, Inject} from '@angular/core';
import {INavigationService, NAVIGATION_SERVICE} from "../../commons/navigation.service";
import {Service} from "../appointment.model";
import {AppointmentRestService} from "../appointment-rest.service";

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent {
  service: Service = new Service();
  constructor(@Inject(NAVIGATION_SERVICE) private navigationService: INavigationService, private appointmentRestService: AppointmentRestService) {
  }

  goToAddAppointmentWithService(service: Service):Promise<boolean> {
    return this.navigationService.openAddAppointmentWithService(service);
  }

  goToAddAppointment():Promise<boolean> {
    return this.navigationService.openAddAppointment();
  }

  saveService() {
    this.appointmentRestService.createService(this.service).subscribe(
      data =>{
        this.goToAddAppointmentWithService(data);
      }
    );
  }

  onSubmit() {
    this.saveService();
  }
}

