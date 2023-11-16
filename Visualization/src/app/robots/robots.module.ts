import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RobotsRoutingModule } from './robots-routing.module';
import { RobotInhibitComponent } from './robot-inhibit/robot-inhibit.component';
import { RobotListAllComponent } from './robot-list-all/robot-list-all.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RobotTypeService } from '../services/robot-type.service';
import { RobotService } from '../services/robot.service';
import { RobotsComponent } from './robots.component';


@NgModule({
  declarations: [
    RobotInhibitComponent,
    RobotListAllComponent,
    RobotsComponent
  ],
  imports: [
    CommonModule,
    RobotsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RobotTypeService,RobotService]

})
export class RobotsModule { }
