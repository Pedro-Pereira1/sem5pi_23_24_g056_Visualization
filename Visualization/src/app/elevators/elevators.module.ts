import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElevatorsRoutingModule } from './elevators-routing.module';
import { ElevatorEditComponent } from './elevator-edit/elevator-edit.component';
import { ElevatorListInBuildingComponent } from './elevator-list-in-building/elevator-list-in-building.component';


@NgModule({
  declarations: [
    ElevatorEditComponent,
    ElevatorListInBuildingComponent
  ],
  imports: [
    CommonModule,
    ElevatorsRoutingModule
  ]
})
export class ElevatorsModule { }
