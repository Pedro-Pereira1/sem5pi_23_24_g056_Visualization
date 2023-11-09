import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotsComponent } from './robots.component';

describe('RobotsComponent', () => {
  let component: RobotsComponent;
  let fixture: ComponentFixture<RobotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RobotsComponent]
    });
    fixture = TestBed.createComponent(RobotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
