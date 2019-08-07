import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderHistoryRoutingModule } from './order-history.routing';
import { OrderHistoryComponent } from './order-history.component';

@NgModule({
  imports: [
    CommonModule,
    OrderHistoryRoutingModule
  ],
  declarations: [
    OrderHistoryComponent
  ]
})
export class OrderHistoryModule { }
