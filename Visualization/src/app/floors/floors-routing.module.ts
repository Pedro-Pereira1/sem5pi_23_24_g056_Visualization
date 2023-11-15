import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorsComponent } from './floors.component';
import { FloorEditComponent } from './floor-edit/floor-edit.component';
import { FloorListAllFloorsOfBuildingComponent } from './floor-list-all-floors-of-building/floor-list-all-floors-of-building.component';
import { FloorListFloorsPassagewaysComponent } from './floor-list-floors-passageways/floor-list-floors-passageways.component';
import { LoadFloorMapComponent } from './load-floor-map/load-floor-map.component';

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
  },
  { path: 'loadFloorMap', component: LoadFloorMapComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloorsRoutingModule { }
