export class Appointment {
  id!: number;
  animalName!: string;
  dateAndTime!: string;
  doctor!: string;
  services!: Array<Service>;
  status!: StatusType;
  diagnostic?: string;
}
export class Service {
  id?: number;
  serviceName: string = '';
  price!: number;
  selected?: boolean = false;
}

export class StatusType {
  status!: string;
  selected?: boolean = false;
}
