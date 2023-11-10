import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorEditComponent } from './elevator-edit.component';

describe('ElevatorEditComponent', () => {
  let component: ElevatorEditComponent;
  let fixture: ComponentFixture<ElevatorEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElevatorEditComponent]
    });
    fixture = TestBed.createComponent(ElevatorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
