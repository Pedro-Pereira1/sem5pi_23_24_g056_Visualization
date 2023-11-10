import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RobotsModule } from './robots.module';
import { RobotInhibitComponent } from './robot-inhibit/robot-inhibit.component';
import { RobotListAllComponent } from './robot-list-all/robot-list-all.component';
import { RobotsComponent } from './robots.component';

const routes: Routes = [
  {
    path: 'createRobot',
    component: RobotsComponent
  },
  {
    path: 'inhibitRobot',
    component: RobotInhibitComponent
  },
  {
    path: 'listAll',
    component: RobotListAllComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RobotsRoutingModule { }
