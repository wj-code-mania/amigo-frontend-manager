import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTablesModule } from 'angular-datatables';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

import { StripeRoutingModule } from './stripe.routing';
import { StripeComponent } from './stripe.component';

@NgModule({
  imports: [
    CommonModule,
    StripeRoutingModule,
    DataTablesModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    StripeComponent
  ]
})
export class StripeModule { }
