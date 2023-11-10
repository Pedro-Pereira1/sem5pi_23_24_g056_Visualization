import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorsComponent } from './floors.component';
import { FloorEditComponent } from './floor-edit/floor-edit.component';
import { FloorListAllFloorsOfBuildingComponent } from './floor-list-all-floors-of-building/floor-list-all-floors-of-building.component';
import { FloorListFloorsPassagewaysComponent } from './floor-list-floors-passageways/floor-list-floors-passageways.component';

const routes: Routes = [
  {path: 'createFloor', 
  component: FloorsComponent
  },
  {path: 'editFloor',
  component: FloorEditComponent
  },
  {path: 'listAllFloorsOfBuilding',
  component: FloorListAllFloorsOfBuildingComponent
  },
  {path: 'listFloorsPassageways',
  component: FloorListFloorsPassagewaysComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloorsRoutingModule { }
