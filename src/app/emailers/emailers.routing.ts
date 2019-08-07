import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailersCanteenNewsComponent } from './emailers-canteen-news/emailers-canteen-news.component';
import { EmailersSendComponent } from './emailers-send/emailers-send.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'news', component: EmailersCanteenNewsComponent, pathMatch: 'full'},
    { path: 'send', component: EmailersSendComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailersRoutingModule { }