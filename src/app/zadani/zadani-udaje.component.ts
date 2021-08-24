import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, DataService, ParamsService, Seznamy, IVozidla } from '../core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
// import { slideRightLeftAnimation } from '../core/animations';

@Component({
  selector: 'app-udaje',
  templateUrl: './zadani-udaje.component.html',  
})
export class ZadaniUdajeComponent implements OnInit {

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
    private formBuilder: FormBuilder,       
    private dataService: DataService,
    private alertService: AlertService,
    private paramsService: ParamsService,
    private localeService: BsLocaleService    
  ) { }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-default', adaptivePosition: false, dateInputFormat: 'D.M.YYYY' });
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 365*100);
    this.maxDate.setDate(this.maxDate.getDate() + 30);
    this.localeService.use('cs');

    const formOptions: AbstractControlOptions = {};
    this.form = this.formBuilder.group({
      znacka: [null, Validators.required],
      model: [null, Validators.required],      
      palivo: [null, Validators.required],
      uziti: [null, Validators.required],
      najezd: [null, Validators.required],
      rz: [null], 
      vin: [null],       
      objem_motoru: [null, Validators.required],
      vykon_motoru: [null, Validators.required],
      hmotnost: [null, Validators.required],            
      uvedenidp: [new Date(), Validators.required],
      cena: [500000, Validators.required],  
    }, formOptions);

    this.data = this.dataService.data;
    this.form.patchValue(this.data.vozidlo);
    this.lists = this.paramsService.lists;
    this.layout = this.paramsService.layout;

  }  

  get f() { return this.form.controls; }  

  onSubmit() {
    this.submitted = true;
    // console.log('UDAJE form ', this.form);
    if (this.form.invalid) {
        return;
    }
    this.updateVozidlo();
  }  

  private updateVozidlo() {
    this.dataService.data.vozidlo.znacka = this.form.value.znacka;
    this.dataService.data.vozidlo.model = this.form.value.model;
    this.dataService.data.vozidlo.palivo = this.form.value.palivo;
    this.dataService.data.vozidlo.uziti = this.form.value.uziti;
    this.dataService.data.vozidlo.najezd = this.form.value.najezd;    
    this.dataService.data.vozidlo.rz = this.form.value.rz;
    this.dataService.data.vozidlo.vin = this.form.value.vin;
    this.dataService.data.vozidlo.objem_motoru = this.form.value.objem_motoru;
    this.dataService.data.vozidlo.vykon_motoru = this.form.value.vykon_motoru;
    this.dataService.data.vozidlo.hmotnost = this.form.value.hmotnost;
    this.dataService.data.vozidlo.uvedenidp = this.form.value.uvedenidp;
    this.dataService.data.vozidlo.cena = this.form.value.cena;

    this.router.navigate(['../osoby'], { relativeTo: this.route });
  }

  modelList( change: boolean = false ): void {
    if (change) { this.form.value.model = null; }
    if (this.form.value.znacka) {
        const options = [];
        const modely = this.paramsService.lists.model.filter( opt => opt.znacka === this.form.value.znacka );
        // console.log(modely);
        modely.forEach( opt => {
            options.push( {
                label: opt.label,
                value: opt.value
            });
        });
        if (modely.length === 1) { this.form.value.model = modely[0].value; }
        // console.log(options);
        this.lists.model = options;
    }
}  

}
