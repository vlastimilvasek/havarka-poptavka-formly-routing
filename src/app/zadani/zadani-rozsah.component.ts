import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, ParamsService, Seznamy, IVozidla } from '../core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-rozsah',
    templateUrl: './zadani-rozsah.component.html',
})
export class ZadaniRozsahComponent implements OnInit {

    formlyForm = new FormGroup({});
    formlyOptions: FormlyFormOptions = {};
    formlyFields: FormlyFieldConfig[];

    form!: FormGroup;
    data: IVozidla;
    lists: Seznamy;
    submitted = false;
    loading = false;
    layout;

    bsConfig: Partial<BsDatepickerConfig>;
    minDate: Date;
    maxDate: Date;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private paramsService: ParamsService,
        private translate: TranslateService,
        private localeService: BsLocaleService
    ) { }

    ngOnInit() {
        this.bsConfig = Object.assign({}, { containerClass: 'theme-default', adaptivePosition: true, dateInputFormat: 'D.M.YYYY' });
        this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setDate(this.minDate.getDate());
        this.maxDate.setDate(this.maxDate.getDate() + 90);
        this.localeService.use('cs');

        this.data = this.dataService.data;
        this.lists = this.paramsService.lists;
        this.layout = this.paramsService.layout;
        this.setFields();

    }

    onSubmit() {
        if (this.formlyForm.invalid) {
            return;
        }
        this.dataService.data = this.data;
        if (!(this.data.vozidlo.znacka_text || this.data.vozidlo.rz || this.data.vozidlo.vin)) {
            this.router.navigate(['../udaje'], { relativeTo: this.route });
        } else if (!((this.data.pojistnik.rc || this.data.pojistnik.ic) && this.data.pojistnik.email && this.data.pojistnik.telefon)) {
            this.router.navigate(['../osoby'], { relativeTo: this.route });
        } else {
            this.router.navigate(['../zaver'], { relativeTo: this.route });
        }
    }

    private setFields() {
        this.translate.use("cs").subscribe(() => {

        this.formlyFields = [
            {
                template: '<h4 class="vagl text-center pb-4">' + this.translate.instant('RIZIKA.TITLE') + '</h4>',
            },
            {
                fieldGroupClassName: 'row pb-4',
                fieldGroup: [
                    {
                        className: 'offset-md-1 col-md-10 offset-lg-2 col-lg-8 offset-xl-2 col-xl-6',
                        fieldGroup: [
                            {
                                key: 'extra.hav',
                                type: 'switch',
                                templateOptions: {
                                    label: 'RIZIKA.HAV.LABEL',
                                    tooltip: 'RIZIKA.HAV.HINT',
                                    formCheck: 'inline-switch',
                                    hideLabel: true,
                                    grid: { label: 'col', input: 'col-12' }
                                }
                            },
                            {
                                key: 'extra.odc',
                                type: 'switch',
                                templateOptions: {
                                    label: 'RIZIKA.ODC.LABEL',
                                    tooltip: 'RIZIKA.ODC.HINT',
                                    formCheck: 'inline-switch',
                                    hideLabel: true,
                                    grid: { label: 'col', input: 'col-12' }
                                }
                            },
                            {
                                key: 'extra.zver',
                                type: 'switch',
                                templateOptions: {
                                    label: 'RIZIKA.ZVER.LABEL',
                                    tooltip: 'RIZIKA.ZVER.HINT',
                                    formCheck: 'inline-switch',
                                    hideLabel: true,
                                    grid: { label: 'col', input: 'col-12' }
                                }
                            },
                            {
                                key: 'extra.zivel',
                                type: 'switch',
                                templateOptions: {
                                    label: 'RIZIKA.ZIVEL.LABEL',
                                    tooltip: 'RIZIKA.ZIVEL.HINT',
                                    formCheck: 'inline-switch',
                                    hideLabel: true,
                                    grid: { label: 'col', input: 'col-12' }
                                }
                            }, 
                            {
                                key: 'extra.pov',
                                type: 'switch',
                                templateOptions: {
                                    label: 'RIZIKA.POV.LABEL',
                                    tooltip: 'RIZIKA.POV.HINT',
                                    formCheck: 'inline-switch',
                                    hideLabel: true,
                                    grid: { label: 'col', input: 'col-12' }
                                }
                            }, 
                            {
                                key: 'extra.spol',
                                type: 'btn-radio',
                                templateOptions: {
                                    label: 'RIZIKA.SPOL.LABEL',
                                    tooltip: 'RIZIKA.SPOL.HINT',
                                    options: [
                                        { value: 1, label: this.translate.instant('RIZIKA.SPOL.VALUE.1') },
                                        { value: 5, label: this.translate.instant('RIZIKA.SPOL.VALUE.5') },
                                        { value: 10, label: this.translate.instant('RIZIKA.SPOL.VALUE.10') }
                                    ],
                                    size: 'small',
                                }
                            }, 
                            {
                                key: 'pocatek',
                                type: 'datepicker',
                                templateOptions: {
                                    label: 'POJISTKA.POCATEK.LABEL',
                                    tooltip: 'POJISTKA.POCATEK.HINT',
                                    minDate: this.minDate,
                                    maxDate: this.maxDate,
                                    required: true,
                                    addonRight: {
                                        class: 'fa fa-calendar',
                                    },                                    
                                },                               
                            },                            
                        ]
                    },
                ]
            },                                                                   
        ]
    });

    }
    
}
