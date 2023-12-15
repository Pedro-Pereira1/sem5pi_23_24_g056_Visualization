import { TestBed } from '@angular/core/testing';

import { AuthComponentService } from './auth-component.service';

describe('AuthComponentService', () => {
  let service: AuthComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
