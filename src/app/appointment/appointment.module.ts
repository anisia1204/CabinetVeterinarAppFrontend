import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppointmentRoutingModule} from "./appointment-routing.module";
import {AppointmentListComponent} from "./appointment-list/appointment-list.component";
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import {FormsModule} from "@angular/forms";
import { CreateServiceComponent } from './create-service/create-service.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';



@NgModule({
  declarations: [
    AppointmentListComponent,
    CreateAppointmentComponent,
    CreateServiceComponent,
    UpdateAppointmentComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    FormsModule
  ]
})
export class AppointmentModule { }
