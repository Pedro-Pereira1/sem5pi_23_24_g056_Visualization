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
import { CampusGuard } from './guard/campus.guard';
import { RobotsGuard } from './guard/robots.guard';
import { BackofficeGuard } from './guard/backoffice.guard';
import { View3DGuard } from './guard/view3d.guard';
import { TasksBackofficeGuard } from './guard/tasks-backoffice.guard';

const routes: Routes = [
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent , canActivate: [VerifyAuthServiceService]},
  {path: 'buildings',
    loadChildren: () => import('./buildings/buildings.module').then(m => m.BuildingsModule), canActivate: [CampusGuard]
  },
  {path: 'floors',
  loadChildren: () => import('./floors/floors.module').then(m => m.FloorsModule), canActivate: [CampusGuard]},
  {path: 'passageways',
  loadChildren: () => import('./passageways/passageways.module').then(m => m.PassagewaysModule), canActivate: [CampusGuard]},
  {path: 'elevators',
  loadChildren: () => import('./elevators/elevators.module').then(m => m.ElevatorsModule), canActivate: [CampusGuard]},
  {path: 'rooms',
  loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule), canActivate: [CampusGuard]},
  {path: 'robot-types',
  loadChildren: () => import('./robot-types/robot-types.module').then(m => m.RobotTypesModule), canActivate: [RobotsGuard]},
  {path: 'robots', 
  loadChildren: () => import('./robots/robots.module').then(m => m.RobotsModule), canActivate: [RobotsGuard]},
  {path: 'view3d', component: View3dComponent, canActivate: [View3DGuard]},
  {path: 'shortest-path', component: ShortestPathComponent, canActivate: [VerifyAuthServiceService]},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'backoffice-user', component: BackofficeUserComponent, canActivate: [BackofficeGuard]},
  {path: 'user-data', component: UserDataComponent, canActivate: [VerifyAuthServiceService]},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'tasks-backoffice', 
  loadChildren: () => import('./tasks-backoffice/tasks-backoffice.module').then(m => m.TasksBackofficeModule), canActivate: [TasksBackofficeGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
