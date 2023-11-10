import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElevatorsComponent } from './elevators.component';
import { ElevatorEditComponent } from './elevator-edit/elevator-edit.component';
import { ElevatorListInBuildingComponent } from './elevator-list-in-building/elevator-list-in-building.component';

const routes: Routes = [
  {path: 'create',
  component: ElevatorsComponent
  },
  {path: 'edit',
  component: ElevatorEditComponent
  },
  {path: 'listInBuilding',
  component: ElevatorListInBuildingComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElevatorsRoutingModule { }
