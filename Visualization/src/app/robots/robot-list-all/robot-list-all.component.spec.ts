import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotListAllComponent } from './robot-list-all.component';

describe('RobotListAllComponent', () => {
  let component: RobotListAllComponent;
  let fixture: ComponentFixture<RobotListAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RobotListAllComponent]
    });
    fixture = TestBed.createComponent(RobotListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
