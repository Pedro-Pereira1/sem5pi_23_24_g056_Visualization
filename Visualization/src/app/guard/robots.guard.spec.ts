import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { robotsGuard } from './robots.guard';

describe('robotsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => robotsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
