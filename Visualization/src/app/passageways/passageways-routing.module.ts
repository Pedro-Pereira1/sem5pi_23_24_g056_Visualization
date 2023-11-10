import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassagewaysComponent } from './passageways.component';
import { PassagewayEditComponent } from './passageway-edit/passageway-edit.component';
import { PassagewayListPassagewaysBetweenBuildingsComponent } from './passageway-list-passageways-between-buildings/passageway-list-passageways-between-buildings.component';

const routes: Routes = [
  {path: 'createPassageway', 
  component: PassagewaysComponent
  },
  {path: 'editPassageway',
  component: PassagewayEditComponent
  },
  {path: 'list',
  component: PassagewayListPassagewaysBetweenBuildingsComponent
  }

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassagewaysRoutingModule { }
