import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorListAllFloorsOfBuildingComponent } from './floor-list-all-floors-of-building.component';

describe('FloorListAllFloorsOfBuildingComponent', () => {
  let component: FloorListAllFloorsOfBuildingComponent;
  let fixture: ComponentFixture<FloorListAllFloorsOfBuildingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloorListAllFloorsOfBuildingComponent]
    });
    fixture = TestBed.createComponent(FloorListAllFloorsOfBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
