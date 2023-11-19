import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorCreateComponent } from './elevator-create.component';

describe('ElevatorCreateComponent', () => {
  let component: ElevatorCreateComponent;
  let fixture: ComponentFixture<ElevatorCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElevatorCreateComponent]
    });
    fixture = TestBed.createComponent(ElevatorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
