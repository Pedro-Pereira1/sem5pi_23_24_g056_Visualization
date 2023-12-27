import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { INavbarData, fadeInOut } from './helper';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';


interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    fadeInOut,
  trigger('rotate', [
    transition(':enter', [
      animate('600ms',
      keyframes([
        style({transform: 'rotate(0deg)', offset: '0'}),
        style({transform: 'rotate(1turn)', offset: '1'}),
      ])
      )
    ])
  ])
  ]
})

export class SidenavComponent implements OnInit{

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple:boolean = false;
  userRole: string = '';

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  constructor(
    public router: Router,
    private authService: AuthServiceService
    ) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.userRole = this.authService.getRoleByToken(this.authService.getToken()!);
  }

  checkPermission(data: INavbarData): boolean {
    if(data.permission){
      return data.permission.includes(this.userRole);
    }
    return true;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  handleClick(item: INavbarData): void {
    if(!this.multiple){
      for(let modelItem of this.navData){
        if(item !== modelItem && modelItem.expanded){
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routerLink) ? 'active' : '';
  }
}
