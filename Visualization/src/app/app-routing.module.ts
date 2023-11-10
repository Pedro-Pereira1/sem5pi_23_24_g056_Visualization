import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingsComponent } from './buildings/buildings.component';
import { RobotsComponent } from './robots/robots.component';
import { HomeComponent } from './home/home.component';
import { RobotTypesComponent } from './robot-types/robot-types.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'buildings',
    loadChildren: () => import('./buildings/buildings.module').then(m => m.BuildingsModule)
  },
  {path: 'robot-types',component: RobotTypesComponent},
  {path: 'robots', component: RobotsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
