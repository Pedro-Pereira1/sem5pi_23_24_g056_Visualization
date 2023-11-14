import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingsRoutingModule } from './buildings-routing.module';
import { BuildingsComponent } from './buildings.component';
import { BuildingEditComponent } from './building-edit/building-edit.component';
import { BuildingListAllComponent } from './building-list-all/building-list-all.component';
import { BuildingListMaxMinComponent } from './building-list-max-min/building-list-max-min.component';
import { HttpClientModule } from '@angular/common/http';
import { BuildingService } from '../services/building.service';
import { FormsModule } from '@angular/forms';
import { BuildingCreateComponent } from './building-create/building-create.component';



@NgModule({
  declarations: [
    BuildingsComponent,
    BuildingEditComponent,
    BuildingListAllComponent,
    BuildingListMaxMinComponent,
    BuildingCreateComponent
  ],
  imports: [
    CommonModule,
    BuildingsRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [BuildingService]
})
export class BuildingsModule { }
