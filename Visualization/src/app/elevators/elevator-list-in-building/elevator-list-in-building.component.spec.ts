import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorListInBuildingComponent } from './elevator-list-in-building.component';

describe('ElevatorListInBuildingComponent', () => {
  let component: ElevatorListInBuildingComponent;
  let fixture: ComponentFixture<ElevatorListInBuildingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElevatorListInBuildingComponent]
    });
    fixture = TestBed.createComponent(ElevatorListInBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
