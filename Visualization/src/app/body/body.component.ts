import { Component, Input } from '@angular/core';
import { VerifyAuthServiceService } from '../services/verify-auth-service.service';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  providers: [VerifyAuthServiceService]
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;
  isSideNavCollapsed = false;

  constructor(private verifyAuthService: VerifyAuthServiceService) { }

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth >0) {
      styleClass = 'body-md-screen';
  }
    return styleClass;
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  isLogged(): boolean {
    return this.verifyAuthService.isLoged();
  }

}
