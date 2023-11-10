import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RobotsRoutingModule } from './robots-routing.module';
import { RobotInhibitComponent } from './robot-inhibit/robot-inhibit.component';
import { RobotListAllComponent } from './robot-list-all/robot-list-all.component';


@NgModule({
  declarations: [
    RobotInhibitComponent,
    RobotListAllComponent
  ],
  imports: [
    CommonModule,
    RobotsRoutingModule
  ]
})
export class RobotsModule { }
