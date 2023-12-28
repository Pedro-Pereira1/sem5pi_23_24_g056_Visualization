import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tasksUsersGuard } from './tasks-users.guard';

describe('tasksUsersGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tasksUsersGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
