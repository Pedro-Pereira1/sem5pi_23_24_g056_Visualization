import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { View3dComponent } from './view3d/view3d.component';
import { ShortestPathComponent } from './shortest-path/shortest-path.component';
import { VerifyAuthServiceService } from './services/verify-auth-service.service';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'buildings',
    loadChildren: () => import('./buildings/buildings.module').then(m => m.BuildingsModule), canActivate: [VerifyAuthServiceService]
  },
  {path: 'floors',
  loadChildren: () => import('./floors/floors.module').then(m => m.FloorsModule)},
  {path: 'passageways',
  loadChildren: () => import('./passageways/passageways.module').then(m => m.PassagewaysModule)},
  {path: 'elevators',
  loadChildren: () => import('./elevators/elevators.module').then(m => m.ElevatorsModule)},
  {path: 'rooms',
  loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule)},
  {path: 'robot-types',
  loadChildren: () => import('./robot-types/robot-types.module').then(m => m.RobotTypesModule)},
  {path: 'robots', 
  loadChildren: () => import('./robots/robots.module').then(m => m.RobotsModule)},
  {path: 'view3d', component: View3dComponent},
  {path: 'shortest-path', component: ShortestPathComponent},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
