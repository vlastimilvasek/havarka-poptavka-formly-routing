import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';

import { ZadaniRoutingModule } from './zadani-routing.module';
import { ZadaniComponent } from '../zadani/zadani.component';
import { ZadaniUdajeComponent } from '../zadani/zadani-udaje.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ZadaniRoutingModule
  ],  
  declarations: [
    ZadaniComponent,
    ZadaniUdajeComponent
  ]
})
export class ZadaniModule { }