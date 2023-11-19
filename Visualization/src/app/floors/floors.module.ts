import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorsRoutingModule } from './floors-routing.module';
import { FloorsComponent } from './floors.component';
import { FloorEditComponent } from './floor-edit/floor-edit.component';
import { FloorListAllFloorsOfBuildingComponent } from './floor-list-all-floors-of-building/floor-list-all-floors-of-building.component';
import { FloorListFloorsPassagewaysComponent } from './floor-list-floors-passageways/floor-list-floors-passageways.component';
import { FloorService } from '../services/floor.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuildingService } from '../services/building.service';
import { LoadFloorMapComponent } from './load-floor-map/load-floor-map.component';


@NgModule({
  declarations: [
    FloorsComponent,
    FloorEditComponent,
    FloorListAllFloorsOfBuildingComponent,
    FloorListFloorsPassagewaysComponent,
    LoadFloorMapComponent
  ],
  imports: [
    CommonModule,
    FloorsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FloorService,BuildingService]
})
export class FloorsModule { }
