import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService, DataService, Kalkulace, Store } from '../core';
// import { slideRightLeftAnimation } from '../core/animations';

@Component({
  selector: 'app-udaje',
  templateUrl: './zadani-udaje.component.html',  
})
export class ZadaniUdajeComponent implements OnInit {

  private subscription: Subscription;
  form!: FormGroup;  
  store: Observable<Store>; 
  submitted = false;
  loading = false;

  layout = {
    grid: {
        column : 'col-lg-6',
        label : 'col-sm-5',
        input : 'col-sm-7',
        offset : 'offset-sm-5',
        label2 : 'col-lg-8 col-sm-5',
        input2 : 'col-lg-4 col-sm-7',
        column1 : 'order-3 order-md-0 col-md-7 col-lg-6 col-xl-7',
        column2 : 'order-2 col-md-5 col-lg-5 offset-lg-1 col-xl-4',
        info1 : 'col-sm-3 col-md-12',
        info2 : 'col-sm-9 col-md-12',
    },
    table : true,
    helper : 'none',
    produktCollapsed : {},
    filtrCollapsed : true,
    controls : {
        druh: null
    },
    prvniNapoveda : true,
    form_r : {
        loading : false,
        error : false
    },
    progress: 0,
    kalkulaceAktivni : false,
    kalkulaceMailOdeslan : false,
    dataNacitani : false
  };

  lists = {
    znacka: [],
    model: [],
    druh: [],
    rok_vyroby: [],
    palivo: [],
    uziti: [],
    najezd: [],
    pojistnik: [],
    provozovatel: [],
    psc: [],
    castiobce: [],
    ppsc: [],
    pcastiobce: []    
  };  

  constructor(
    private route: ActivatedRoute,    
    private router: Router,   
    private formBuilder: FormBuilder,       
    private dataService: DataService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    const formOptions: AbstractControlOptions = {};
    this.form = this.formBuilder.group({
      objem_motoru: ['', Validators.required],
      vykon_motoru: ['', Validators.required],
      hmotnost: ['', Validators.required],            
      palivo: ['', Validators.required],
      uziti: ['', Validators.required],            
    }, formOptions);

    this.store = this.dataService.store.pipe(
      tap(store => {
        this.form.patchValue(store.data.vozidlo);
        this.lists = store.lists;
      })
    );    
  }  

  get f() { return this.form.controls; }  

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
        return;
    }
    this.loading = false;
    this.updateVozidlo();

  }  

  private updateVozidlo() {
    this.dataService.updateVozidlo(this.form.value);
    this.alertService.success('Vozidlo updated', { keepAfterRouteChange: true });
    this.router.navigate(['./udaje'], { relativeTo: this.route });
    this.loading = false;
  }  

}
