import { TestBed } from '@angular/core/testing';

import { Snackbar.ServiceService } from './snackbar.service.service';

describe('Snackbar.ServiceService', () => {
  let service: Snackbar.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Snackbar.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
