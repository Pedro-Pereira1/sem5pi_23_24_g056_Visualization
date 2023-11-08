import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { MainMenuComponent } from './Components/main-menu/main-menu.component';

const routes: Routes = [
  {path: '', component: SideBarComponent},
  {path: 'mainMenu', component: MainMenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
