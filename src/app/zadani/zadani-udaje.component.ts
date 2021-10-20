import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, DataService, ParamsService, Seznamy, IVozidla } from '../core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { formlyVozidloLevy } from '../core/formly/forms/zadani.udaje';
// import { slideRightLeftAnimation } from '../core/animations';

@Component({
    selector: 'app-udaje',
    templateUrl: './zadani-udaje.component.html',
})
export class ZadaniUdajeComponent implements OnInit {

    data: IVozidla;
    lists: Seznamy;
    layout;

    bsConfig: Partial<BsDatepickerConfig>;
    minDate: Date;
    maxDate: Date;

    formlyForm = new FormGroup({});
    formlyOptions: FormlyFormOptions = {};
    formlyFields: FormlyFieldConfig[];


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private translate: TranslateService,
        private paramsService: ParamsService,
        private localeService: BsLocaleService
    ) {
        // console.log('ZadaniUdaje OnInit: ', this.translate.instant('ZADANI.VOZIDLO.TITLE'));
        // this.setFields();
    }

    ngOnInit() {
        this.bsConfig = Object.assign({}, { containerClass: 'theme-default', adaptivePosition: false, dateInputFormat: 'D.M.YYYY' });
        this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setDate(this.minDate.getDate() - 365 * 100);
        this.maxDate.setDate(this.maxDate.getDate() + 30);
        this.localeService.use('cs');

        this.data = this.dataService.data;
        this.lists = this.paramsService.lists;
        this.layout = this.paramsService.layout;

        // this.formlyModel = this.dataService.data;
        this.setFields();
        this.setOptions();
        // console.log('UDAJE form ', this);
    }


    onSubmit() {
        // console.log('UDAJE form ', this.formlyForm.invalid);
        if (this.formlyForm.invalid) {
            return;
        }
        this.updateVozidlo();
    }

    private updateVozidlo() {
        this.dataService.data = this.data;
        this.router.navigate(['../osoby'], { relativeTo: this.route });
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

    private setFields() {
        this.translate.use("cs").subscribe(() => {

        this.formlyFields = [
            {
                template: '<h4 class="vagl text-center pb-4">' + this.translate.instant('ZADANI.VOZIDLO.TITLE') + '</h4>',
            },
            {
                fieldGroupClassName: 'row pb-4',
                fieldGroup: [
                    {
                        className: 'col-lg-6',
                        fieldGroup: this.setFormlyVozidloLevy()
                    },
                    {
                        className: 'col-lg-6',
                        fieldGroup: this.setFormlyVozidloPravy()
                    }
                ]
            },
            {
                template: '<h4 class="vagl text-center pb-4">' + this.translate.instant('VOZIDLO.ZABEZPECENI.TITLE') + '</h4>',
            },
            {
                fieldGroupClassName: 'row pb-4',
                fieldGroup: [
                    {
                        className: 'col-lg-6',
                        fieldGroup: this.setFormlyZabezpeceniLevy()
                    },
                    {
                        className: 'col-lg-6',
                        fieldGroup: this.setFormlyZabezpeceniPravy()
                    }
                ]
            },            
        ];
        
        });
    }

    private setFormlyVozidloLevy(): FormlyFieldConfig[] {
        return [
            {
                key: 'vozidlo.znacka',
                type: 'ngx-select',
                templateOptions: {
                    label: 'VOZIDLO.ZNACKA.LABEL',
                    tooltip: 'VOZIDLO.ZNACKA.HINT',
                    required: true,
                    options: this.lists.znacka,
                },
                hideExpression: (model) => model.sid == 1,
            },
            {
                key: 'vozidlo.model',
                type: 'ngx-select',
                templateOptions: {
                    label: 'VOZIDLO.MODEL.LABEL',
                    tooltip: 'VOZIDLO.MODEL.HINT',
                    required: true,
                    options: this.lists.model,
                },
                hideExpression: (model) => !model.vozidlo.znacka || model.sid == 1,
                expressionProperties: { // model je vyhrazená proměnná Formly
                    'templateOptions.options': 'formState.selectOptionsData.model.filter(item => item.znacka === model.vozidlo.znacka)',
                    // vyresetuje výběr, když model neodpovídá značce
                    // 'model.vozidlo.model': `field.templateOptions.options.find(o => o.id === model.vozidlo.model) ? model.vozidlo.model : null`,
                    // jediná hodnota
                    // 'model.vozidlo.model': `formState.selectOptionsData.model.length == 1 ? formState.selectOptionsData.model[0].value : null`,
                },                
            },
            {
                key: 'vozidlo.palivo',
                type: 'ngx-select',
                templateOptions: {
                    label: 'VOZIDLO.PALIVO.LABEL',
                    tooltip: 'VOZIDLO.PALIVO.HINT',
                    required: true,
                    options: this.lists.palivo,
                },
            },
            {
                key: 'vozidlo.uziti',
                type: 'ngx-select',
                templateOptions: {
                    label: 'VOZIDLO.UZITI.LABEL',
                    tooltip: 'VOZIDLO.UZITI.HINT',
                    required: true,
                    options: this.lists.uziti,
                },
            },
            {
                key: 'vozidlo.najezd',
                type: 'ngx-select',
                templateOptions: {
                    label: 'VOZIDLO.NAJEZD.LABEL',
                    tooltip: 'VOZIDLO.NAJEZD.HINT',
                    required: true,
                    options: this.lists.najezd,
                },
            },                                                       
            {
                key: 'vozidlo.rz',
                type: 'input',
                templateOptions: {
                    label: 'VOZIDLO.RZ.LABEL',
                    tooltip: 'VOZIDLO.RZ.HINT',
                    placeholder: 'VOZIDLO.RZ.PLACEHOLDER',
                    minLength: 6,
                }
            },
            {
                key: 'vozidlo.vin',
                type: 'input',
                templateOptions: {
                    label: 'VOZIDLO.VIN.LABEL',
                    tooltip: 'VOZIDLO.VIN.HINT',
                    placeholder: 'VOZIDLO.VIN.PLACEHOLDER',
                    required: true,
                    minLength: 17,
                    maxLength: 17,
                }
            },            
        ]
    }


    private setFormlyVozidloPravy(): FormlyFieldConfig[] {
        return [
            {
                key: 'vozidlo.objem_motoru',
                type: 'number-mask',
                templateOptions: {
                    label: 'VOZIDLO.OBJEM.LABEL',
                    tooltip: 'VOZIDLO.OBJEM.HINT',
                    placeholder: 'VOZIDLO.OBJEM.PLACEHOLDER',
                    maskOptions: { separateThousands: true },
                    required: true,
                    min: 100,
                    max: 5000,
                    addonRight: {
                        text: this.translate.instant('FORM.CCM'),
                    },
                }
            },            
            {
                key: 'vozidlo.vykon_motoru',
                type: 'number-mask',
                templateOptions: {
                    label: 'VOZIDLO.VYKON.LABEL',
                    tooltip: 'VOZIDLO.VYKON.HINT',
                    placeholder: 'VOZIDLO.VYKON.PLACEHOLDER',
                    maskOptions: { separateThousands: true },
                    required: true,
                    min: 10,
                    max: 600,                    
                    addonRight: {
                        text: this.translate.instant('FORM.KW'),
                    },
                }
            },
            {
                key: 'vozidlo.hmotnost',
                type: 'number-mask',
                templateOptions: {
                    label: 'VOZIDLO.HMOTNOST.LABEL',
                    tooltip: 'VOZIDLO.HMOTNOST.HINT',
                    placeholder: 'VOZIDLO.HMOTNOST.PLACEHOLDER',
                    maskOptions: { separateThousands: true },
                    required: true,
                    min: 100,
                    max: 3500,                    
                    addonRight: {
                        text: this.translate.instant('FORM.KG'),
                    },
                }
            },
            {
                key: 'vozidlo.uvedenidp',
                type: 'datepicker',
                templateOptions: {
                    label: 'VOZIDLO.UVEDENIDP.LABEL',
                    tooltip: 'VOZIDLO.UVEDENIDP.HINT',
                    placeholder: 'VOZIDLO.UVEDENIDP.PLACEHOLDER',
                    required: true,
                    minDate: new Date('1930-01-01T00:00:00'),
                    maxDate: new Date(),
                    bsConfig: {
                        dateInputFormat: 'D.M.YYYY',
                        showWeekNumbers: false,
                        startView: 'year',
                        containerClass: 'theme-default',
                    },
                    addonRight: {
                        class: 'fa fa-calendar',
                        onClick: () => {},
                    },
                    change: (field, $event) => { console.log('DP change ', field )}    
                }
            },            
            {
                key: 'vozidlo.stav_tachometr',
                type: 'number-mask',
                templateOptions: {
                    label: 'VOZIDLO.TACHOMETR.LABEL',
                    tooltip: 'VOZIDLO.TACHOMETR.HINT',
                    placeholder: 'VOZIDLO.TACHOMETR.PLACEHOLDER',
                    maskOptions: { separateThousands: true },
                    required: true,
                    min: 0,
                    max: 1000000,                     
                    addonRight: {
                        text: this.translate.instant('FORM.KM'),
                    },
                }
            }, 
            {
                key: 'vozidlo.cena',
                type: 'number-mask',
                templateOptions: {
                    label: 'VOZIDLO.CENA.LABEL',
                    tooltip: 'VOZIDLO.CENA.HINT',
                    placeholder: 'VOZIDLO.CENA.PLACEHOLDER',
                    maskOptions: { separateThousands: true },
                    required: true,
                    min: 10000,
                    max: 5000000,                     
                    addonRight: {
                        text: this.translate.instant('FORM.KC'),
                    },
                }
            },                                      
        ]
    }

    private setFormlyZabezpeceniLevy(): FormlyFieldConfig[] {
        return [
            {
                key: 'vozidlo.zabezpeceni.imob',
                type: 'switch',
                templateOptions: {
                    label: 'VOZIDLO.ZABEZPECENI.IMOB.LABEL',
                    tooltip: 'VOZIDLO.ZABEZPECENI.IMOB.HINT',
                    formCheck: 'inline-switch',
                    hideLabel: true,
                    grid: { label: 'col', input: 'col-12' }
                }
            },
            {
                key: 'vozidlo.zabezpeceni.sklo',
                type: 'switch',
                templateOptions: {
                    label: 'VOZIDLO.ZABEZPECENI.SKLO.LABEL',
                    tooltip: 'VOZIDLO.ZABEZPECENI.SKLO.HINT',
                    formCheck: 'inline-switch',
                    hideLabel: true,
                    grid: { label: 'col', input: 'col-12' }
                }
            },
            {
                key: 'vozidlo.zabezpeceni.alarm',
                type: 'switch',
                templateOptions: {
                    label: 'VOZIDLO.ZABEZPECENI.ALARM.LABEL',
                    tooltip: 'VOZIDLO.ZABEZPECENI.ALARM.HINT',
                    formCheck: 'inline-switch',
                    hideLabel: true,
                    grid: { label: 'col', input: 'col-12' }
                }
            },                        
        ]
    }

    private setFormlyZabezpeceniPravy(): FormlyFieldConfig[] {
        return [
            {
                key: 'vozidlo.zabezpeceni.mech',
                type: 'switch',
                templateOptions: {
                    label: 'VOZIDLO.ZABEZPECENI.MECH.LABEL',
                    tooltip: 'VOZIDLO.ZABEZPECENI.MECH.HINT',
                    formCheck: 'inline-switch',
                    hideLabel: true,
                    grid: { label: 'col', input: 'col-12' }
                }
            },
            {
                key: 'vozidlo.zabezpeceni.pasiv',
                type: 'switch',
                templateOptions: {
                    label: 'VOZIDLO.ZABEZPECENI.PASIV.LABEL',
                    tooltip: 'VOZIDLO.ZABEZPECENI.PASIV.HINT',
                    formCheck: 'inline-switch',
                    hideLabel: true,
                    grid: { label: 'col', input: 'col-12' }
                }
            },
            {
                key: 'vozidlo.zabezpeceni.aktiv',
                type: 'switch',
                templateOptions: {
                    label: 'VOZIDLO.ZABEZPECENI.AKTIV.LABEL',
                    tooltip: 'VOZIDLO.ZABEZPECENI.AKTIV.HINT',
                    formCheck: 'inline-switch',
                    hideLabel: true,
                    grid: { label: 'col', input: 'col-12' }
                }
            },                        
        ]
    }    
  
}
