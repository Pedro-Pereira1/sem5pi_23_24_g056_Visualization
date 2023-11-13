import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { View3dComponent } from './view3d/view3d.component';
import { ShortestPathComponent } from './shortest-path/shortest-path.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    HomeComponent,
    SublevelMenuComponent,
    View3dComponent,
    ShortestPathComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
