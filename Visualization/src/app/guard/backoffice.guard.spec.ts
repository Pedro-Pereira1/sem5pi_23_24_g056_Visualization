import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { backofficeGuard } from './backoffice.guard';

describe('backofficeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => backofficeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
