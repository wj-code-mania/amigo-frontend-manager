import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTablesModule } from 'angular-datatables';

import { CallbackRoutingModule } from './callback.routing';
import { CallbackStripeAuthComponent } from './callback-stripe-auth/callback-stripe-auth.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    CallbackStripeAuthComponent
  ],
  imports: [
    CommonModule,
    CallbackRoutingModule,
    DataTablesModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class CallbackModule { }
