import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorListFloorsPassagewaysComponent } from './floor-list-floors-passageways.component';

describe('FloorListFloorsPassagewaysComponent', () => {
  let component: FloorListFloorsPassagewaysComponent;
  let fixture: ComponentFixture<FloorListFloorsPassagewaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloorListFloorsPassagewaysComponent]
    });
    fixture = TestBed.createComponent(FloorListFloorsPassagewaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
