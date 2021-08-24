import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AlertService, DataService, ParamsService, Seznamy, IVozidla } from '../core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
// import { slideRightLeftAnimation } from '../core/animations';

@Component({
  selector: 'app-osoby',
  templateUrl: './zadani-osoby.component.html',  
})
export class ZadaniOsobyComponent implements OnInit {

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
    /*
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
    */

    this.data = this.dataService.data;
    // this.form.patchValue(this.data.vozidlo);
    this.lists = this.paramsService.lists;
    this.layout = this.paramsService.layout;

    this.lists.pojistnik.psc = Observable.create((observer: any) => {
      observer.next(this.data.pojistnik.adresa.psc);
    }).pipe(mergeMap((token: string) => this.paramsService.getHledej('psc', token, this.data.pojistnik.adresa)));
    this.lists.provozovatel.psc = Observable.create((observer: any) => {
        observer.next(this.data.provozovatel.adresa.psc);
    }).pipe(mergeMap((token: string) => this.paramsService.getHledej('psc', token, this.data.provozovatel.adresa)));

    this.obecList(false, 'pojistnik');
    this.obecList(false, 'provozovatel');    
  }  

  // get f() { return this.form.controls; }  

  onSubmit(form) {
    this.submitted = true;
    // console.log('OSOBY form ', form);
    if (form.invalid) {
        return;
    }
    this.loading = true;
    this.dataService.data = this.data;
    if (this.data.vozidlo.znacka_text || this.data.vozidlo.rz || this.data.vozidlo.vin) {
      this.router.navigate(['../rozsah'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../udaje'], { relativeTo: this.route });
    }
    this.loading = false;

  }  

  obecList( change: boolean = false, osoba: string, event = null ): void {
    let psc = 0;
    if (change) {
        this.data[osoba].adresa.cast_obce_id = '';
        this.data[osoba].adresa.adr_id = '';
        this.data[osoba].adresa.obec = '';
        this.data[osoba].adresa.psc = psc = event;
    } else {
        psc = Number(this.data.pojistnik.adresa.psc);
    }
    // console.log('obecList - change', change);
    // console.log('obecList - event', event);
    // console.log('obecList - psc', psc);
    if ( psc >= 10000) {
        const options = [];
        this.paramsService.getHledej('obec-cast', '', this.data[osoba].adresa).subscribe( casti => {
            // console.log('casti obce : ', casti);
            casti.forEach( opt => {
                options.push( {
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
        });
    }
  }

  selectCoid(options, osoba: string): void {
      // console.log('ZADANI selectCoid - event ', options);
      this.data[osoba].adresa.obec = options[0].data.obec;
  }

}
