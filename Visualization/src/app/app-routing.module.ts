import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingsComponent } from './buildings/buildings.component';
import { RobotsComponent } from './robots/robots.component';
import { HomeComponent } from './home/home.component';
import { RobotTypesComponent } from './robot-types/robot-types.component';
import { FloorsComponent } from './floors/floors.component';
import { PassagewaysComponent } from './passageways/passageways.component';
import { ElevatorsComponent } from './elevators/elevators.component';
import { RoomsComponent } from './rooms/rooms.component';
import { View3dComponent } from './view3d/view3d.component';
import { ShortestPathComponent } from './shortest-path/shortest-path.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'buildings',
    loadChildren: () => import('./buildings/buildings.module').then(m => m.BuildingsModule)
  },
  {path: 'floors',component:FloorsComponent},
  {path: 'passageways',component:PassagewaysComponent},
  {path: 'elevators',component:ElevatorsComponent},
  {path: 'rooms',component:RoomsComponent},
  {path: 'robot-types',component: RobotTypesComponent},
  {path: 'robots', component: RobotsComponent},
  {path: 'view3d', component: View3dComponent},
  {path: 'shortest-path', component: ShortestPathComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
