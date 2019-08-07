import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanteenCategoriesComponent } from './canteen-categories/canteen-categories.component';
import { CanteenProductsComponent } from './canteen-products/canteen-products.component';
import { CanteenSummaryComponent } from './canteen-summary/canteen-summary.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'summary', component: CanteenSummaryComponent, pathMatch: 'full'},
    { path: 'categories', component: CanteenCategoriesComponent},
    { path: 'products', component: CanteenProductsComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanteenRoutingModule { }