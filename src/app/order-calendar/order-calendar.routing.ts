import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderCalendarComponent } from './order-calendar.component';

const routes: Routes = [{
  path: '',
  component: OrderCalendarComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderCalendarRoutingModule { }
