import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingsRoutingModule } from './buildings-routing.module';
import { BuildingsComponent } from './buildings.component';
import { BuildingEditComponent } from './building-edit/building-edit.component';
import { BuildingListAllComponent } from './building-list-all/building-list-all.component';
import { BuildingListMaxMinComponent } from './building-list-max-min/building-list-max-min.component';


@NgModule({
  declarations: [
    BuildingsComponent,
    BuildingEditComponent,
    BuildingListAllComponent,
    BuildingListMaxMinComponent
  ],
  imports: [
    CommonModule,
    BuildingsRoutingModule
  ]
})
export class BuildingsModule { }
