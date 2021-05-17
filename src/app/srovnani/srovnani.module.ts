import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';

import { SrovnaniRoutingModule } from './srovnani-routing.module';
import { SrovnaniComponent } from '../srovnani/srovnani.component';


@NgModule({
  declarations: [
    SrovnaniComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SrovnaniRoutingModule
  ]
})
export class SrovnaniModule { }

