import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';

import { ZadaniRoutingModule } from './zadani-routing.module';
import { ZadaniComponent } from '../zadani/zadani.component';
import { ZadaniUdajeComponent } from '../zadani/zadani-udaje.component';
import { ZadaniOsobyComponent } from '../zadani/zadani-osoby.component';
import { ZadaniRozsahComponent } from '../zadani/zadani-rozsah.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ZadaniRoutingModule
  ],  
  declarations: [
    ZadaniComponent,
    ZadaniUdajeComponent,
    ZadaniOsobyComponent,
    ZadaniRozsahComponent    
  ]
})
export class ZadaniModule { }