// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ManagerRoutingModule } from './manager-routing.module';

// libraries
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// components
import { ManagerComponent } from './manager.component';
import { LoginComponent } from './login/login.component';
import { CommonComponent } from './common/common.component';

const APP_CONTAINERS = [
  CommonComponent
];

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

@NgModule({
  declarations: [
    ManagerComponent,
    LoginComponent,
    CommonComponent
  ],
  imports: [  
    BrowserModule,
    ManagerRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule
  ],
  providers: [],
  bootstrap: [ManagerComponent]
})
export class ManagerModule { }
