import { TestBed } from '@angular/core/testing';

import { EnrollmentRateService } from './enrollment-rate.service';

describe('EnrollmentRateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnrollmentRateService = TestBed.get(EnrollmentRateService);
    expect(service).toBeTruthy();
  });
});
