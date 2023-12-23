import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { View3dComponent } from './view3d/view3d.component';
import { ShortestPathComponent } from './shortest-path/shortest-path.component';
import { UserDataComponent } from './user-data/user-data.component';
import { VerifyAuthServiceService } from './services/verify-auth-service.service';
import { AuthModule } from './auth/auth.module';
import { BackofficeUserComponent } from './backoffice-user/backoffice-user.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent , canActivate: [VerifyAuthServiceService]},
  {path: 'buildings',
    loadChildren: () => import('./buildings/buildings.module').then(m => m.BuildingsModule), canActivate: [VerifyAuthServiceService]
  },
  {path: 'floors',
  loadChildren: () => import('./floors/floors.module').then(m => m.FloorsModule), canActivate: [VerifyAuthServiceService]},
  {path: 'passageways',
  loadChildren: () => import('./passageways/passageways.module').then(m => m.PassagewaysModule), canActivate: [VerifyAuthServiceService]},
  {path: 'elevators',
  loadChildren: () => import('./elevators/elevators.module').then(m => m.ElevatorsModule), canActivate: [VerifyAuthServiceService]},
  {path: 'rooms',
  loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule), canActivate: [VerifyAuthServiceService]},
  {path: 'robot-types',
  loadChildren: () => import('./robot-types/robot-types.module').then(m => m.RobotTypesModule), canActivate: [VerifyAuthServiceService]},
  {path: 'robots', 
  loadChildren: () => import('./robots/robots.module').then(m => m.RobotsModule), canActivate: [VerifyAuthServiceService]},
  {path: 'view3d', component: View3dComponent, canActivate: [VerifyAuthServiceService]},
  {path: 'shortest-path', component: ShortestPathComponent, canActivate: [VerifyAuthServiceService]},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'backoffice-user', component: BackofficeUserComponent, canActivate: [VerifyAuthServiceService]},
  {path: 'user-data', component: UserDataComponent, canActivate: [VerifyAuthServiceService]}
  {path: 'privacy', component: PrivacyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
