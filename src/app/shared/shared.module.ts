import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { csLocale } from 'ngx-bootstrap/locale';
defineLocale('cs', csLocale);
import { NgxSelectModule } from 'ngx-select-ex';

import { AlertComponent } from './alert/alert.component';
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
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgxSelectModule.forRoot({ optionValueField: 'value', optionTextField: 'label', keepSelectedItems: false }),    
    TranslateModule
  ],
  declarations: [
    AlertComponent,
    PrubehComponent,
    PageNotFoundComponent
  ],
  exports: [
    AlertComponent,
    PrubehComponent,
    PageNotFoundComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDatepickerModule,
    TypeaheadModule,
    TabsModule,
    PopoverModule,
    TooltipModule,
    NgxSelectModule,    
    TranslateModule
  ]
})

export class SharedModule {}
