import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security.routing';
import { SecurityComponent } from './security.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SecurityRoutingModule
  ],
  declarations: [
    SecurityComponent
  ]
})
export class SecurityModule { }
