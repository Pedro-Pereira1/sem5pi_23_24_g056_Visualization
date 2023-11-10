import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingsComponent } from './buildings.component';
import { BuildingEditComponent } from './building-edit/building-edit.component';
import { BuildingListAllComponent } from './building-list-all/building-list-all.component';
import { BuildingListMaxMinComponent } from './building-list-max-min/building-list-max-min.component';

const routes: Routes = [
  {
    path: 'createBuilding',
    component: BuildingsComponent 
  },
  {
    path: 'editBuilding',
    component: BuildingEditComponent
  },
  {
    path: 'listAllBuildings',
    component: BuildingListAllComponent
  },
  {
    path: 'listBuildingsMaxMinFloors',
    component: BuildingListMaxMinComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingsRoutingModule { }
