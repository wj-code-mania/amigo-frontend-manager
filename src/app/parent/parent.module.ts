import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTablesModule } from 'angular-datatables';

import { ParentRoutingModule } from './parent.routing';
import { ParentListComponent } from './parent-list/parent-list.component';
import { ParentInfoComponent } from './parent-info/parent-info.component';
import { FormsModule } from '@angular/forms';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    ParentRoutingModule,
    DataTablesModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    RouterModule
  ],
  declarations: [
    ParentListComponent,
    ParentInfoComponent
  ]
})
export class ParentModule { }
