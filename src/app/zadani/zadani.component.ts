import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControlOptions, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, DataService, IVozidlo, Vozidla } from '../core';

@Component({
  selector: 'app-zadani',
  templateUrl: './zadani.component.html',
})
export class ZadaniComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  submitted = false;
  data: IVozidlo; 
  progress = 0;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,    
    private formBuilder: FormBuilder,
    private alertService: AlertService,  
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const formOptions: AbstractControlOptions = {};
    this.form = this.formBuilder.group({
        rz: ['', Validators.required],
    }, formOptions);

    this.form.patchValue(this.dataService.data.vozidlo);
    this.loading = false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.updateVozidlo();

  }

  private updateVozidlo() {
    for(let i = 1; i <= 300; i++) {
      setTimeout(() => {
          this.progress = i;
      }, i*100);
    } 

    this.dataService.getVozidloCKP(this.form.value.rz).subscribe((result: Boolean) => {
      if (result) {
        this.dataService.data.sid = 1;
        this.dataService.data.vozidlo.znacka = 999;
        this.dataService.data.vozidlo.model = 99999;
        this.alertService.success('Vozidlo: ' + (this.dataService.data.vozidlo.znacka_text ? this.dataService.data.vozidlo.znacka_text : this.form.value.rz)  + '. Prosím zkontrolujte dohledané údaje.', { keepAfterRouteChange: true });
      } else {
        this.dataService.data.vozidlo.rz = this.form.value.rz;
        this.alertService.info('Údaje o vozidle se nepodařilo dohledat. Prosím vyplňte potřebné údaje', { keepAfterRouteChange: true });
      }
      this.router.navigate(['./udaje'], { relativeTo: this.route });
      this.loading = false;
    });
  }

}
