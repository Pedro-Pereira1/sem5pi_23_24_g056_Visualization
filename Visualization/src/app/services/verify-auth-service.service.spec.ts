import { TestBed } from '@angular/core/testing';

import { VerifyAuthServiceService } from './verify-auth-service.service';

describe('VerifyAuthServiceService', () => {
  let service: VerifyAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
