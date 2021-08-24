import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, DataService, ParamsService, Seznamy, IVozidla } from '../core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
// import { slideRightLeftAnimation } from '../core/animations';

@Component({
  selector: 'app-rozsah',
  templateUrl: './zadani-rozsah.component.html',  
})
export class ZadaniRozsahComponent implements OnInit {

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

    /*
    const formOptions: AbstractControlOptions = {};
    this.form = this.formBuilder.group({
      hav: [null, Validators.required],
      odc: [null, Validators.required],      
      zver: [null, Validators.required],
      zivel: [null, Validators.required],
      pov: [null, Validators.required],
    }, formOptions);
    */

    this.data = this.dataService.data;
    // this.form.patchValue(this.data.vozidlo);
    this.lists = this.paramsService.lists;
    this.layout = this.paramsService.layout;

  }  

  // get f() { return this.form.controls; }  

  onSubmit(form) {
    this.submitted = true;
    // console.log('ROZSAH form ', form);
    if (form.invalid) {
        return;
    }
    this.loading = true;
    this.dataService.data = this.data;
    if (!(this.data.vozidlo.znacka_text || this.data.vozidlo.rz || this.data.vozidlo.vin)) {
      this.router.navigate(['../udaje'], { relativeTo: this.route });
    } else if (!((this.data.pojistnik.rc || this.data.pojistnik.ic) && this.data.pojistnik.email && this.data.pojistnik.telefon)) {
      this.router.navigate(['../osoby'], { relativeTo: this.route });      
    } else {
      this.router.navigate(['../../zaver'], { relativeTo: this.route });
    }
    this.loading = false;

  }  

}
