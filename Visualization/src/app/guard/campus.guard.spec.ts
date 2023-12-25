import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { campusGuard } from './campus.guard';

describe('campusGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => campusGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
