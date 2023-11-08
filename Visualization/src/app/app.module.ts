import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './Component/main-menu/main-menu.component';
import { SideBarComponent } from './Component/side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
