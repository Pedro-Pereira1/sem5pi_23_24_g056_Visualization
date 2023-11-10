import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RobotTypesComponent } from './robot-types.component';

const routes: Routes = [
  {
    path: 'createRobotType',
    component: RobotTypesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RobotTypesRoutingModule { }
