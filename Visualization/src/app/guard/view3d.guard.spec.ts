import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { view3dGuard } from './view3d.guard';

describe('view3dGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => view3dGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
