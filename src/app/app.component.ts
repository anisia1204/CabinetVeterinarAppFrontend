import {Component, Inject} from '@angular/core';
import {INavigationService, NAVIGATION_SERVICE} from "./commons/navigation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CabinetVeterinarApp';


  constructor(@Inject(NAVIGATION_SERVICE) private navigationService: INavigationService) {
  }

  goToAddAppointment(): Promise<boolean> {
      return this.navigationService.openAddAppointment();
  }


}
