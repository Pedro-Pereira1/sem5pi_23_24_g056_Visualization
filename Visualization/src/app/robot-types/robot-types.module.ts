import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RobotTypesRoutingModule } from './robot-types-routing.module';
import { RobotTypeService } from '../services/robot-type.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RobotTypesComponent } from './robot-types.component';


@NgModule({
  declarations: [RobotTypesComponent],
  imports: [
    CommonModule,
    RobotTypesRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RobotTypeService]
})
export class RobotTypesModule { }
