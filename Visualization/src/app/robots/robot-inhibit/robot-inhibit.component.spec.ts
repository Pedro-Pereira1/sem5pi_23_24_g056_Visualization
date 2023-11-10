import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotInhibitComponent } from './robot-inhibit.component';

describe('RobotInhibitComponent', () => {
  let component: RobotInhibitComponent;
  let fixture: ComponentFixture<RobotInhibitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RobotInhibitComponent]
    });
    fixture = TestBed.createComponent(RobotInhibitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
