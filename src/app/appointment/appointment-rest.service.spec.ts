import { TestBed } from '@angular/core/testing';

import { AppointmentRestService } from './appointment-rest.service';

describe('AppointmentRestService', () => {
  let service: AppointmentRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
