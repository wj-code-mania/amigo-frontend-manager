import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';


import { SettingsRoutingModule } from './settings.routing';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    DataTablesModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    RouterModule
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule { }
