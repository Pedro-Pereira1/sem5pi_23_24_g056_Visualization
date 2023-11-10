import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RobotsComponent } from './robots/robots.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { FloorsComponent } from './floors/floors.component';
import { PassagewaysComponent } from './passageways/passageways.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ElevatorsComponent } from './elevators/elevators.component';
import { RobotTypesComponent } from './robot-types/robot-types.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    RobotsComponent,
    HomeComponent,
    SublevelMenuComponent,
    FloorsComponent,
    PassagewaysComponent,
    RoomsComponent,
    ElevatorsComponent,
    RobotTypesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
