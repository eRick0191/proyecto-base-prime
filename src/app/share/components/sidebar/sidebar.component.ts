import {Component, HostListener, Input, OnInit} from '@angular/core';
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {DividerModule} from "primeng/divider";
import {MaterialModule} from "../../material/material.module";
import {CommonModule} from "@angular/common";
import {NgxPermissionsService} from "ngx-permissions";
import {AuthService} from "../../services/auth.service";

export interface MenuItem {
  label: string;
  icon: string;
  expandable?: boolean;
  expanded?: boolean;
  route?: string;
  subItems: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, HeaderComponent, FooterComponent, DividerModule],
  providers: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isShowing = false;
  isMobileView: boolean = false;
  @Input() menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi-home',
      route: '/home/dashboard',
      subItems: []
    },
    {
      label: 'Administración',
      icon: 'pi-spin pi-cog',
      expandable: true,
      expanded: false,
      subItems: [
        {
          label: 'Usuarios',
          icon: 'pi-user',
          route: '/management/users',
          subItems: [],
        },
      ],
    },

  ];

  constructor(private permissionsService: NgxPermissionsService,
              private _authService: AuthService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobileView();
  }

  ngOnInit(): void {
    this.checkMobileView();
    this.cargarPermisos();
  }

  checkMobileView() {
    this.isMobileView = window.innerWidth <= 960;
  }

  toggleMenuItem(item: any) {
    if (item.expandable) {
      item.expanded = !item.expanded;
    }
  }

  mouseenter() {
    this.isShowing = true;
  }

  mouseleave() {
    this.isShowing = false;
  }

  cargarPermisos() {


    const perms = this._authService.getPermissions();
    this.permissionsService.flushPermissions();
    console.log(perms)
    Object.keys(perms).forEach(key => {
      if (perms[key]) {
        this.permissionsService.addPermission(key);
      }
    });

  }

}

