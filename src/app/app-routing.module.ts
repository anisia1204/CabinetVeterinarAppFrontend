import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/appointments', pathMatch: 'full'},
  {path: 'appointments', loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
