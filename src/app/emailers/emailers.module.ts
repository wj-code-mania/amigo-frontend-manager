import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

import { EmailersRoutingModule } from './emailers.routing';
import { EmailersCanteenNewsComponent } from './emailers-canteen-news/emailers-canteen-news.component';
import { EmailersSendComponent } from './emailers-send/emailers-send.component';

@NgModule({
  imports: [
    CommonModule,
    EmailersRoutingModule,
    DataTablesModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxEditorModule
  ],
  declarations: [
    EmailersCanteenNewsComponent,
    EmailersSendComponent
  ]
})
export class EmailersModule { }
