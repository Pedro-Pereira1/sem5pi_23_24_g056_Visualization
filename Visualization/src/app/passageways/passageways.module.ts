import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassagewaysRoutingModule } from './passageways-routing.module';
import { PassagewayEditComponent } from './passageway-edit/passageway-edit.component';
import { PassagewayListPassagewaysBetweenBuildingsComponent } from './passageway-list-passageways-between-buildings/passageway-list-passageways-between-buildings.component';


@NgModule({
  declarations: [
    PassagewayEditComponent,
    PassagewayListPassagewaysBetweenBuildingsComponent
  ],
  imports: [
    CommonModule,
    PassagewaysRoutingModule
  ]
})
export class PassagewaysModule { }
