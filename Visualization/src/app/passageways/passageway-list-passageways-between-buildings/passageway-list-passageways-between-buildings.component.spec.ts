import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassagewayListPassagewaysBetweenBuildingsComponent } from './passageway-list-passageways-between-buildings.component';

describe('PassagewayListPassagewaysBetweenBuildingsComponent', () => {
  let component: PassagewayListPassagewaysBetweenBuildingsComponent;
  let fixture: ComponentFixture<PassagewayListPassagewaysBetweenBuildingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassagewayListPassagewaysBetweenBuildingsComponent]
    });
    fixture = TestBed.createComponent(PassagewayListPassagewaysBetweenBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
