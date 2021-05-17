import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { NgxSelectModule } from 'ngx-select-ex';

import { PrubehComponent } from './prubeh/prubeh.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    NgxSelectModule.forRoot({ optionValueField: 'value', optionTextField: 'label', keepSelectedItems: false }),    
    TranslateModule
  ],
  declarations: [
    PrubehComponent,
    PageNotFoundComponent
  ],
  exports: [
    PrubehComponent,
    PageNotFoundComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TabsModule,
    PopoverModule,
    NgxSelectModule,    
    TranslateModule
  ]
})

export class SharedModule {}
