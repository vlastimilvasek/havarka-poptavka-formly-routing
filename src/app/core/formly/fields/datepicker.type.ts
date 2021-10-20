import { Component, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-form-datepicker-type',
  template: `
    <input type="text"
      class="form-control calendar"
      placement="bottom"
      bsDatepicker
      [formlyAttributes]="field"
      [bsConfig]="to.bsConfig"
      [minDate]="to.minDate"
      [maxDate]="to.maxDate"
      [formControl]="formControl"
      [class.is-invalid]="showError"
      autocomplete="off"
  >`,
})
export class FormlyFieldDatepicker extends FieldType {
  defaultOptions = {
    templateOptions: {
      bsConfig: {
        dateInputFormat: 'D.M.YYYY',
        showWeekNumbers: false,
        containerClass: 'theme-default',
      },
    },
  };
}
