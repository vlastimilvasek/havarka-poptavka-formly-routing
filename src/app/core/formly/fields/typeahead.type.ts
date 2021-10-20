import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-typeahead',
  template: `
    <input
      type="text"  
      [formControl]="formControl"
      class="form-control"
      [formlyAttributes]="field"
      [class.is-invalid]="showError"
      [typeahead]="to.typeahead"
      [typeaheadOptionsLimit]="to.typeaheadOptionsLimit"
      [typeaheadMinLength]="to.typeaheadMinLength"
      [typeaheadWaitMs]="to.typeaheadWaitMs"
      autocomplete="off"
    >
  `,
})
export class FormlyFieldTypeahead extends FieldType {
  defaultOptions = {
    templateOptions: {
      typeahead: [],
      typeaheadOptionsLimit: 10,
      typeaheadMinLength: 1,
      typeaheadWaitMs: 300,
    },
  };
}
