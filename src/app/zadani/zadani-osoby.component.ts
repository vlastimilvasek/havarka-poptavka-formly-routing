import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { mergeMap, switchMap, startWith, distinctUntilChanged, map, debounceTime } from 'rxjs/operators';

import { DataService, ParamsService, Seznamy, IVozidla } from '../core';
// import { slideRightLeftAnimation } from '../core/animations';

@Component({
    selector: 'app-osoby',
    templateUrl: './zadani-osoby.component.html',
})
export class ZadaniOsobyComponent implements OnInit {

    data: IVozidla;
    lists: Seznamy;
    layout;
    submitted;

    formlyForm = new FormGroup({});
    formlyOptions: FormlyFormOptions = {};
    formlyFields: FormlyFieldConfig[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private translate: TranslateService,
        private dataService: DataService,
        private paramsService: ParamsService
    ) { }

    ngOnInit() {

        this.data = this.dataService.data;
        this.lists = this.paramsService.lists;
        this.layout = this.paramsService.layout;

        this.setFields();
        this.setOptions();
    }


    onSubmit() {

        if (this.formlyForm.invalid) {
            return;
        }
        this.dataService.data = this.data;
        if (this.data.vozidlo.znacka_text || this.data.vozidlo.rz || this.data.vozidlo.vin) {
            this.router.navigate(['../rozsah'], { relativeTo: this.route });
        } else {
            this.router.navigate(['../udaje'], { relativeTo: this.route });
        }

    }

    private setOptions() {
        this.formlyOptions = {
            formState: {
                selectOptionsData: {
                    model: this.lists.model,
                },
            },
        };
    }
    obecList(osoba: string, psc = null): Observable<any[]> {
        const options = [];
        return this.paramsService.getHledej('obec-cast', '', this.data[osoba].adresa).pipe(
            map(casti => {
                // console.log('casti obce : ', casti);
                casti.forEach(opt => {
                    options.push({
                        label: opt.nazev,
                        value: opt.id,
                        obec: opt.nazev_obce
                    });
                });
                if (casti.length === 1) {
                    this.data[osoba].adresa.cast_obce_id = casti[0].id;
                    this.data[osoba].adresa.obec = casti[0].nazev_obce;
                }
                this.lists[osoba].castiobce = options;
                // console.log('options : ', options);
                return options;
            })
        );
    }

    selectCoid(options, osoba: string): void {
        console.log('ZADANI selectCoid - event ', options);
        this.data[osoba].adresa.obec = options[0].data.obec;
    }

    private setFields() {
        this.translate.use("cs").subscribe(() => {

        this.formlyFields = [
            {
                template: '<h4 class="vagl text-center pb-4">' + this.translate.instant('ZADANI.OSOBY.TITLE') + '</h4>',
            },
            {
                fieldGroupClassName: 'row pb-4',
                fieldGroup: [
                    {
                        className: 'col-lg-6',
                        fieldGroup: this.setFormlyPojistnik()
                    },
                    {
                        className: 'col-lg-6',
                        fieldGroup: this.setFormlyOsobyPravy()
                    }
                ]
            },
        ];
        
        });
    }

    private setFormlyPojistnik(): FormlyFieldConfig[] {
        return [
            {
                template: '<h5 class="vagl">' + this.translate.instant('OSOBA.POJISTNIK.TITLE') + '</h5>',
            },
            {
                key: 'pojistnik.typ',
                type: 'ngx-select',
                templateOptions: {
                    label: 'OSOBA.POJISTNIK.LABEL',
                    tooltip: 'OSOBA.POJISTNIK.HINT',
                    required: true,
                    options: this.lists.osobaTyp,
                },
            },
            {
                key: 'pojistnik.jmeno',
                type: 'input',
                templateOptions: {
                    label: 'OSOBA.JMENO.LABEL',
                    tooltip: 'OSOBA.JMENO.HINT',
                    placeholder: 'OSOBA.JMENO.PLACEHOLDER',
                    minLength: 6,
                    required: true,
                },
                hideExpression: (model) => (model.pojistnik.typ > 3),
            },
            {
                key: 'pojistnik.rc',
                type: 'rc-mask',
                templateOptions: {
                    label: 'OSOBA.RC.LABEL',
                    tooltip: 'OSOBA.RC.HINT',
                    placeholder: 'OSOBA.RC.PLACEHOLDER',
                    maskOptions: { emitInvalid: true, emitAll: false },
                    required: true,
                },
                hideExpression: (model) => (model.pojistnik.typ > 3),
            },   
            {
                key: 'pojistnik.ic',
                type: 'input',
                templateOptions: {
                    label: 'OSOBA.IC.LABEL',
                    tooltip: 'OSOBA.IC.HINT',
                    placeholder: 'OSOBA.IC.PLACEHOLDER',
                    pattern: /\d{8,8}/,
                    required: true,
                },
                hideExpression: (model) => (model.pojistnik.typ < 3),
                validation: {
                    messages: {
                        pattern: (error, field: FormlyFieldConfig) => this.translate.instant('FORM.VALIDATION.IC', { value: field.formControl.value }), // `"${field.formControl.value}" is not a valid IP Address`,
                    },
                },                
            },                               
            {
                key: 'pojistnik.adresa.psc',
                type: 'number-mask',
                templateOptions: {
                    label: 'ADRESA.PSC.LABEL',
                    tooltip: 'ADRESA.PSC.HINT',
                    placeholder: 'ADRESA.PSC.PLACEHOLDER',
                    typeahead: [], //this.lists.pojistnik.psc,
                    typeaheadAsync: true,
                    typeaheadOptionField: 'psc',         
                    maskOptions: { formatZip: true },
                    required: true,
                    min: 10000,
                    max: 79999,
                },
                hooks: {
                    onInit: (field: FormlyFieldConfig) => {
                        field.formControl.valueChanges.subscribe(psc => {
                            field.templateOptions.typeahead = this.paramsService.getHledej('psc', psc, this.data.pojistnik.adresa);
                        })
                    },
                },           
            },
            {
                key: 'pojistnik.adresa.cast_obce_id',
                type: 'ngx-select',
                templateOptions: {
                    label: 'ADRESA.OBEC.LABEL',
                    tooltip: 'ADRESA.OBEC.HINT',
                    required: true,
                    options: [],
                },
                hideExpression: (model) => (model.pojistnik.adresa.psc < 10000),
                hooks: {
                    onInit: (field: FormlyFieldConfig) => {
                        const pscField = field.form.get('pojistnik.adresa.psc');
                        pscField.valueChanges.pipe(
                            distinctUntilChanged(),
                            debounceTime(300)
                        ).subscribe(psc => {
                            if (psc >= 10000) {
                                this.obecList('pojistnik', psc).subscribe(items => { field.templateOptions.options = items });
                            } else {
                                field.templateOptions.options = [];
                            }
                            // field.templateOptions.options = (psc >= 10000) ? this.obecList('pojistnik', psc) : []; // pro select, který umi async
                        })

                    },
                },
            },
            {
                key: 'pojistnik.email',
                type: 'input',
                templateOptions: {
                    label: 'OSOBA.EMAIL.LABEL',
                    tooltip: 'OSOBA.EMAIL.HINT',
                    placeholder: 'OSOBA.EMAIL.PLACEHOLDER',
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    required: true,
                },
                validation: {
                    messages: {
                        pattern: this.translate.instant('FORM.VALIDATION.EMAIL'),
                    },
                },                
            }, 
            {
                key: 'pojistnik.telefon',
                type: 'tel-mask',
                templateOptions: {
                    label: 'OSOBA.TELEFON.LABEL',
                    tooltip: 'OSOBA.TELEFON.HINT',
                    placeholder: 'OSOBA.TELEFON.PLACEHOLDER',
                    required: true,
                }
            },

        ]
    }

    private setFormlyVlastnik(): FormlyFieldConfig[] {
        return [
            {
                template: '<h5 class="vagl">' + this.translate.instant('OSOBA.VLASTNIK.TITLE') + '</h5>',
            },
            {
                key: 'vlastnik.typ',
                type: 'ngx-select',
                templateOptions: {
                    label: 'OSOBA.VLASTNIK.LABEL',
                    tooltip: 'OSOBA.VLASTNIK.HINT',
                    required: true,
                    options: this.lists.osobaTyp,
                },
            },
            {
                key: 'vlastnik.jmeno',
                type: 'input',
                templateOptions: {
                    label: 'OSOBA.JMENO.LABEL',
                    tooltip: 'OSOBA.JMENO.HINT',
                    placeholder: 'OSOBA.JMENO.PLACEHOLDER',
                    minLength: 6,
                    required: true,
                },
                hideExpression: (model) => (model.vlastnik.typ > 3),
            },
            {
                key: 'vlastnik.rc',
                type: 'rc-mask',
                templateOptions: {
                    label: 'OSOBA.RC.LABEL',
                    tooltip: 'OSOBA.RC.HINT',
                    placeholder: 'OSOBA.RC.PLACEHOLDER',
                    maskOptions: { emitInvalid: true, emitAll: false },
                    required: true,
                },
                hideExpression: (model) => (model.vlastnik.typ > 3),
            },   
            {
                key: 'vlastnik.ic',
                type: 'input',
                templateOptions: {
                    label: 'OSOBA.IC.LABEL',
                    tooltip: 'OSOBA.IC.HINT',
                    placeholder: 'OSOBA.IC.PLACEHOLDER',
                    pattern: /\d{8,8}/,
                    required: true,
                },
                hideExpression: (model) => (model.vlastnik.typ < 3),
                validation: {
                    messages: {
                        pattern: (error, field: FormlyFieldConfig) => this.translate.instant('FORM.VALIDATION.IC', { value: field.formControl.value }), // `"${field.formControl.value}" is not a valid IP Address`,
                    },
                },                
            },                               
            {
                key: 'vlastnik.adresa.psc',
                type: 'number-mask',
                templateOptions: {
                    label: 'ADRESA.PSC.LABEL',
                    tooltip: 'ADRESA.PSC.HINT',
                    placeholder: 'ADRESA.PSC.PLACEHOLDER',
                    typeahead: [], //this.lists.vlastnik.psc,
                    typeaheadAsync: true,
                    typeaheadOptionField: 'psc',         
                    maskOptions: { formatZip: true },
                    required: true,
                    min: 10000,
                    max: 79999,
                },
                hooks: {
                    onInit: (field: FormlyFieldConfig) => {
                        field.formControl.valueChanges.subscribe(psc => {
                            field.templateOptions.typeahead = this.paramsService.getHledej('psc', psc, this.data.vlastnik.adresa);
                        })
                    },
                },                
            },
            {
                key: 'vlastnik.adresa.cast_obce_id',
                type: 'ngx-select',
                templateOptions: {
                    label: 'ADRESA.OBEC.LABEL',
                    tooltip: 'ADRESA.OBEC.HINT',
                    required: true,
                    options: [],
                },
                hideExpression: (model) => (model.vlastnik.adresa.psc < 10000),
                hooks: {
                    onInit: (field: FormlyFieldConfig) => {
                        const pscField = field.parent.fieldGroup.find(f => f.key === 'vlastnik.adresa.psc');
                        pscField.formControl.valueChanges.pipe(
                            distinctUntilChanged(),
                            debounceTime(300)
                        ).subscribe(psc => {
                            if (psc >= 10000) {
                                this.obecList('vlastnik', psc).subscribe(items => { field.templateOptions.options = items });
                            } else {
                                field.templateOptions.options = [];
                            }
                        })

                    },
                },
            },
        ]
    }

    private setFormlyProvozovatel(): FormlyFieldConfig[] {
        return [
            {
                template: '<h5 class="vagl">' + this.translate.instant('OSOBA.PROVOZOVATEL.TITLE') + '</h5>',
            },
            {
                key: 'provozovatel.typ',
                type: 'ngx-select',
                templateOptions: {
                    label: 'OSOBA.PROVOZOVATEL.LABEL',
                    tooltip: 'OSOBA.PROVOZOVATEL.HINT',
                    required: true,
                    options: this.lists.osobaTyp,
                },
            },
            {
                key: 'provozovatel.jmeno',
                type: 'input',
                templateOptions: {
                    label: 'OSOBA.JMENO.LABEL',
                    tooltip: 'OSOBA.JMENO.HINT',
                    placeholder: 'OSOBA.JMENO.PLACEHOLDER',
                    minLength: 6,
                    required: true,
                },
                hideExpression: (model) => (model.provozovatel.typ > 3),
            },
            {
                key: 'provozovatel.rc',
                type: 'rc-mask',
                templateOptions: {
                    label: 'OSOBA.RC.LABEL',
                    tooltip: 'OSOBA.RC.HINT',
                    placeholder: 'OSOBA.RC.PLACEHOLDER',
                    maskOptions: { emitInvalid: true, emitAll: false },
                    required: true,
                },
                hideExpression: (model) => (model.provozovatel.typ > 3),
            },   
            {
                key: 'provozovatel.ic',
                type: 'input',
                templateOptions: {
                    label: 'OSOBA.IC.LABEL',
                    tooltip: 'OSOBA.IC.HINT',
                    placeholder: 'OSOBA.IC.PLACEHOLDER',
                    pattern: /\d{8,8}/,
                    required: true,
                },
                hideExpression: (model) => (model.provozovatel.typ < 3),
                validation: {
                    messages: {
                        pattern: (error, field: FormlyFieldConfig) => this.translate.instant('FORM.VALIDATION.IC', { value: field.formControl.value }), // `"${field.formControl.value}" is not a valid IP Address`,
                    },
                },                
            },                               
            {
                key: 'provozovatel.adresa.psc',
                type: 'number-mask',
                templateOptions: {
                    label: 'ADRESA.PSC.LABEL',
                    tooltip: 'ADRESA.PSC.HINT',
                    placeholder: 'ADRESA.PSC.PLACEHOLDER',
                    typeahead: [], //this.lists.provozovatel.psc,
                    typeaheadAsync: true,
                    typeaheadOptionField: 'psc',         
                    maskOptions: { formatZip: true },
                    required: true,
                    min: 10000,
                    max: 79999,                    
                },
                hooks: {
                    onInit: (field: FormlyFieldConfig) => {
                        field.formControl.valueChanges.subscribe(psc => {
                            field.templateOptions.typeahead = this.paramsService.getHledej('psc', psc, this.data.provozovatel.adresa);
                        })
                    },
                },                
            },
            {
                key: 'provozovatel.adresa.cast_obce_id',
                type: 'ngx-select',
                templateOptions: {
                    label: 'ADRESA.OBEC.LABEL',
                    tooltip: 'ADRESA.OBEC.HINT',
                    required: true,
                    options: [],
                },
                hideExpression: (model) => (model.provozovatel.adresa.psc < 10000),
                hooks: {
                    onInit: (field: FormlyFieldConfig) => {
                        const pscField = field.parent.fieldGroup.find(f => f.key === 'provozovatel.adresa.psc');
                        pscField.formControl.valueChanges.pipe(
                            distinctUntilChanged(),
                            debounceTime(300)
                        ).subscribe(psc => {
                            if (psc >= 10000) {
                                this.obecList('provozovatel', psc).subscribe(items => { field.templateOptions.options = items });
                            } else {
                                field.templateOptions.options = [];
                            }
                        })

                    },
                },
            },
        ]
    }

    private setFormlyOsobyPravy(): FormlyFieldConfig[] {
        return [
            {
                template: '<h5 class="vagl">' + this.translate.instant('OSOBA.VLASTNIK.TITLE') + '</h5>',
            },
            {
                key: 'pojistnikvlastnik',
                type: 'switch',
                templateOptions: {
                    label: 'OSOBA.POJISTNIKVLASTNIK.LABEL',
                    tooltip: 'OSOBA.POJISTNIKVLASTNIK.HINT',
                    formCheck: 'inline-switch',
                    hideLabel: true,
                    grid: { label: 'col', input: 'col-12' }
                }
            },
            {
                fieldGroup: [
                    {
                        hideExpression: (model) => (model.pojistnikvlastnik),
                        fieldGroup: this.setFormlyVlastnik(),
                    },
                ]
            },       
            {
                template: '<h5 class="vagl">' + this.translate.instant('OSOBA.PROVOZOVATEL.TITLE') + '</h5>',
            },                 
            {
                key: 'pojistnikprovozovatel',
                type: 'switch',
                templateOptions: {
                    label: 'OSOBA.POJISTNIKPROVOZOVATEL.LABEL',
                    tooltip: 'OSOBA.POJISTNIKPROVOZOVATEL.HINT',
                    formCheck: 'inline-switch',
                    hideLabel: true,
                    grid: { label: 'col', input: 'col-12' }
                },
                hooks: {
                    onInit: (field: FormlyFieldConfig) => {
                        const pvField = field.form.get('pojistnikvlastnik');
                        pvField.valueChanges.subscribe(pv => {
                            field.formControl.setValue( pv ? true : false);
                        })

                    },
                },                          
            },
            {
                key: 'vlastnikprovozovatel',
                type: 'switch',
                templateOptions: {
                    label: 'OSOBA.VLASTNIKPROVOZOVATEL.LABEL',
                    tooltip: 'OSOBA.VLASTNIKPROVOZOVATEL.HINT',
                    formCheck: 'inline-switch',
                    hideLabel: true,
                    grid: { label: 'col', input: 'col-12' }
                },
                hideExpression: (model) => (model.pojistnikprovozovatel),                        
            },
            {
                fieldGroup: [
                    {
                        hideExpression: (model) => (model.pojistnikprovozovatel || model.vlastnikprovozovatel),
                        fieldGroup: this.setFormlyProvozovatel(),
                    },
                ]
            },                        
        ]
    }

}

