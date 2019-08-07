import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackStripeAuthComponent } from './callback-stripe-auth/callback-stripe-auth.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'stripe', component: CallbackStripeAuthComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallbackRoutingModule { }