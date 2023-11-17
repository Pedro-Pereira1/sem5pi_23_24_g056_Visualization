import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElevatorsRoutingModule } from './elevators-routing.module';
import { ElevatorEditComponent } from './elevator-edit/elevator-edit.component';
import { ElevatorListInBuildingComponent } from './elevator-list-in-building/elevator-list-in-building.component';
import { ElevatorCreateComponent } from './elevator-create/elevator-create.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElevatorService } from '../services/elevator.service';


@NgModule({
  declarations: [
    ElevatorEditComponent,
    ElevatorListInBuildingComponent,
    ElevatorCreateComponent,
  ],
  imports: [
    CommonModule,
    ElevatorsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ElevatorService]
})
export class ElevatorsModule { }
