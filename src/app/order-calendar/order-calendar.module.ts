import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderCalendarRoutingModule } from './order-calendar.routing';
import { OrderCalendarComponent } from './order-calendar.component';

@NgModule({
  imports: [
    CommonModule,
    OrderCalendarRoutingModule
  ],
  declarations: [
    OrderCalendarComponent
  ]
})
export class OrderCalendarModule { }
