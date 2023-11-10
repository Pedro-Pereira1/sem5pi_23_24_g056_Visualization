import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassagewayEditComponent } from './passageway-edit.component';

describe('PassagewayEditComponent', () => {
  let component: PassagewayEditComponent;
  let fixture: ComponentFixture<PassagewayEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassagewayEditComponent]
    });
    fixture = TestBed.createComponent(PassagewayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
