import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

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

import { ZadaniComponent } from '../zadani/zadani.component';
import { ZadaniUdajeComponent } from '../zadani/zadani-udaje.component';
import { ZadaniOsobyComponent } from '../zadani/zadani-osoby.component';
import { ZadaniRozsahComponent } from '../zadani/zadani-rozsah.component';
import { ZaverComponent } from '../zaver/zaver.component';

import { CzRcMaskDirective } from '../core/directives/czrc-mask.directive';
import { CzTelDirective } from '../core/directives/cztel-mask.directive';
import { NumberMaskDirective } from '../core/directives/number-mask.directive';

import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { configExtension } from '../core/formly/config';

import { FormlyFieldNumberMask } from '../core/formly/fields/number.type';
import { FormlyFieldRcMask } from '../core/formly/fields/rc.type';
import { FormlyFieldCzTelMask } from '../core/formly/fields/tel.type';
import { FormlyFieldSwitch } from '../core/formly/fields/switch.type';
import { FormlyFieldBtnRadio } from '../core/formly/fields/btn-radio.type';
import { FormlyFieldRange } from '../core/formly/fields/range.type';
import { FormlyFieldDatepicker } from '../core/formly/fields/datepicker.type';
import { FormlyFieldTypeahead } from '../core/formly/fields/typeahead.type';
import { FormlyFieldNgxSelect } from '../core/formly/fields/ngx-select.type';

import { PanelWrapperComponent } from '../core/formly/wrappers/panel-wrapper.component';
import { MyFormFieldWrapper } from '../core/formly/wrappers/field-wrapper.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function httpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

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
    TranslateModule.forRoot({
        defaultLanguage: "cs",
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
        },
    }),
    FormlyBootstrapModule,
    FormlyModule.forRoot({

  
    }),      
  ],
  declarations: [
    AlertComponent,
    PrubehComponent,
    PageNotFoundComponent,
    ZadaniComponent,
    ZadaniUdajeComponent,
    ZadaniOsobyComponent,
    ZadaniRozsahComponent,
    ZaverComponent,
    CzRcMaskDirective,
    CzTelDirective,
    NumberMaskDirective,    
    FormlyFieldNumberMask,
    FormlyFieldRcMask,
    FormlyFieldCzTelMask,
    FormlyFieldSwitch,
    FormlyFieldBtnRadio,
    FormlyFieldRange,
    FormlyFieldDatepicker,
    FormlyFieldTypeahead,
    FormlyFieldNgxSelect,
    PanelWrapperComponent,
    MyFormFieldWrapper,     
  ],
  exports: [
    AlertComponent,
    PrubehComponent,
    PageNotFoundComponent,
    ZadaniComponent,
    ZadaniUdajeComponent,
    ZadaniOsobyComponent,
    ZadaniRozsahComponent,
    ZaverComponent,
    CzRcMaskDirective,
    CzTelDirective,
    NumberMaskDirective, 
    FormlyFieldNumberMask,
    FormlyFieldRcMask,
    FormlyFieldCzTelMask,
    FormlyFieldSwitch,
    FormlyFieldBtnRadio,
    FormlyFieldRange,
    FormlyFieldDatepicker,
    FormlyFieldTypeahead,
    FormlyFieldNgxSelect,
    PanelWrapperComponent,
    MyFormFieldWrapper,        
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
    TranslateModule,
    FormlyBootstrapModule,
    FormlyModule
  ],
  providers: [
    {
        provide: FORMLY_CONFIG,
        multi: true,
        useFactory: configExtension,
        deps: [TranslateService],
    },
  ],  
})

export class SharedModule {}
