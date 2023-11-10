import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingEditComponent } from './building-edit.component';

describe('BuildingEditComponent', () => {
  let component: BuildingEditComponent;
  let fixture: ComponentFixture<BuildingEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingEditComponent]
    });
    fixture = TestBed.createComponent(BuildingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
