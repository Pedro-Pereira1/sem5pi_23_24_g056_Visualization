import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingsRoutingModule } from './buildings-routing.module';
import { BuildingsComponent } from './buildings.component';
import { BuildingEditComponent } from './building-edit/building-edit.component';


@NgModule({
  declarations: [
    BuildingsComponent,
    BuildingEditComponent
  ],
  imports: [
    CommonModule,
    BuildingsRoutingModule
  ]
})
export class BuildingsModule { }
