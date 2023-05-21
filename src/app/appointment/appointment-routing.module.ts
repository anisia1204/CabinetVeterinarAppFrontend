import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppointmentListComponent} from "./appointment-list/appointment-list.component";
import {CreateAppointmentComponent} from "./create-appointment/create-appointment.component";
import {CreateServiceComponent} from "./create-service/create-service.component";
import {UpdateAppointmentComponent} from "./update-appointment/update-appointment.component";

const routes: Routes = [
  {path: '', component: AppointmentListComponent},
  {path: ':create-appointment', component: CreateAppointmentComponent},
  {path: 'create-appointment/create-service', component: CreateServiceComponent},
  {path: ':update-appointment/:id', component: UpdateAppointmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule {
}
