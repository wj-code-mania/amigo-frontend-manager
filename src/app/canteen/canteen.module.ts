import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTablesModule } from 'angular-datatables';

import { CanteenRoutingModule } from './canteen.routing';
import { CanteenSummaryComponent } from './canteen-summary/canteen-summary.component';
import { CanteenCategoriesComponent } from './canteen-categories/canteen-categories.component';
import { CanteenProductsComponent } from './canteen-products/canteen-products.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    CanteenRoutingModule,
    DataTablesModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    CanteenSummaryComponent,
    CanteenCategoriesComponent,
    CanteenProductsComponent
  ]
})
export class CanteenModule { }
