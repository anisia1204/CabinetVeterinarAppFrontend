import {Injectable, InjectionToken, Provider} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Service} from "../appointment/appointment.model";

export interface INavigationService {
  openAddAppointmentWithService(service: Service): Promise<boolean>;

  openAddAppointment(): Promise<boolean>;

  getParam(activatedRoute: ActivatedRoute, paramName: string): string;

  openAddService(): Promise<boolean>;

  openAppointmentList(): Promise<boolean>;

  openUpdateAppointment(id: number): Promise<boolean>;
}

@Injectable()
export class NavigationService implements INavigationService {

  constructor(private router: Router) {
  }

  openAddAppointment(): Promise<boolean> {
    return this.router.navigate(['appointments', 'create-appointment']);
  }

  openAddAppointmentWithService(service: Service): Promise<boolean> {
    return this.router.navigate(['appointments', 'create-appointment'], { queryParams: { newService: service } });
  }
  openAddService(): Promise<boolean> {
    return this.router.navigate(['appointments','create-appointment','create-service']);
  }

  openAppointmentList(): Promise<boolean> {
    return this.router.navigate(['appointments']);
  }
  openUpdateAppointment(id: number): Promise<boolean> {
    return this.router.navigate(['appointments', 'update-appointment', id]);
  }

  getParam(activatedRoute: ActivatedRoute, paramName: string): string {
    return activatedRoute.snapshot.params[paramName];
  }
}

export const NAVIGATION_SERVICE: InjectionToken<INavigationService> = new InjectionToken('NAVIGATION_SERVICE');

export const NavigationServiceProvider: Provider = {
  provide: NAVIGATION_SERVICE,
  useClass: NavigationService
};
