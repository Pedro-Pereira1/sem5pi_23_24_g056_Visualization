import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PassagewaysRoutingModule} from './passageways-routing.module';
import {PassagewayEditComponent} from './passageway-edit/passageway-edit.component';
import {
  PassagewayListPassagewaysBetweenBuildingsComponent
} from './passageway-list-passageways-between-buildings/passageway-list-passageways-between-buildings.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PassagewaysComponent} from "./passageways.component";
import {HttpClientModule} from "@angular/common/http";
import {PassagewayService} from "../services/passageway.service";


@NgModule({
  declarations: [
    PassagewaysComponent,
    PassagewayEditComponent,
    PassagewayListPassagewaysBetweenBuildingsComponent
  ],
  imports: [
    CommonModule,
    PassagewaysRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PassagewayService]
})

export class PassagewaysModule {
}
