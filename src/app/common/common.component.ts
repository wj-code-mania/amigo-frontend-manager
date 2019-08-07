import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from './_nav';
import { AuthService } from '../service/authservice';
import { ServerService } from '../service/server';

@Component({
  selector: 'manager-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})

export class CommonComponent implements OnInit {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(
    public serverService: ServerService,
    public server: ServerService,
    public authService: AuthService, 
    @Inject(DOCUMENT) _document?: any
  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  
  base_url = this.server.baseUrl;

  schoolInfo = [];

  ngOnInit() {
    this.server.get('get_school_info', true).subscribe(resp => {
      if (resp['code'] === 200) {
        this.schoolInfo = resp['school_info'];
      } else {
        this.schoolInfo = [];
      }
    });
    
    this.serverService.get('check_token_valid', true).subscribe(
      (resp) => {
        if(resp['code'] == 503){
          this.authService.logout();
        }
      }
    );
  }

  logout() {
    this.server.get('logout', true).subscribe(resp => {
      this.authService.logout();
    });
  }
}
