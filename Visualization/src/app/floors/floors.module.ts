import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorsRoutingModule } from './floors-routing.module';
import { FloorsComponent } from './floors.component';
import { FloorEditComponent } from './floor-edit/floor-edit.component';
import { FloorListAllFloorsOfBuildingComponent } from './floor-list-all-floors-of-building/floor-list-all-floors-of-building.component';
import { FloorListFloorsPassagewaysComponent } from './floor-list-floors-passageways/floor-list-floors-passageways.component';


@NgModule({
  declarations: [
    FloorsComponent,
    FloorEditComponent,
    FloorListAllFloorsOfBuildingComponent,
    FloorListFloorsPassagewaysComponent
  ],
  imports: [
    CommonModule,
    FloorsRoutingModule
  ]
})
export class FloorsModule { }
