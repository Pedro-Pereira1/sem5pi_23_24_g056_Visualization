import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tasksBackofficeGuard } from './tasks-backoffice.guard';

describe('tasksBackofficeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tasksBackofficeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
