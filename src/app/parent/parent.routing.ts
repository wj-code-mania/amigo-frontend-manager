import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentListComponent } from './parent-list/parent-list.component';
import { ParentInfoComponent } from './parent-info/parent-info.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: ParentListComponent, pathMatch: 'full'},
    { path: 'info/:id', component: ParentInfoComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }