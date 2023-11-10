import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingListAllComponent } from './building-list-all.component';

describe('BuildingListAllComponent', () => {
  let component: BuildingListAllComponent;
  let fixture: ComponentFixture<BuildingListAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingListAllComponent]
    });
    fixture = TestBed.createComponent(BuildingListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
