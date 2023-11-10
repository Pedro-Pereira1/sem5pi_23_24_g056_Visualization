import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingsComponent } from './buildings.component';
import { BuildingEditComponent } from './building-edit/building-edit.component';

const routes: Routes = [
  {
    path: 'createBuilding',
    component: BuildingsComponent 
  },
  {
    path: 'editBuilding',
    component: BuildingEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingsRoutingModule { }
