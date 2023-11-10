import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingListMaxMinComponent } from './building-list-max-min.component';

describe('BuildingListMaxMinComponent', () => {
  let component: BuildingListMaxMinComponent;
  let fixture: ComponentFixture<BuildingListMaxMinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingListMaxMinComponent]
    });
    fixture = TestBed.createComponent(BuildingListMaxMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
