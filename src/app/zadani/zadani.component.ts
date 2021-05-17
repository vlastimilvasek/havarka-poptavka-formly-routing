import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControlOptions, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { AlertService, DataService, IVozidlo, Kalkulace, Store } from '../core';

@Component({
  selector: 'app-zadani',
  templateUrl: './zadani.component.html',
})
export class ZadaniComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  submitted = false;
  private subscription: Subscription;
  data: Kalkulace;
  store: Observable<Store>;  

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

    this.store = this.dataService.store.pipe(
      tap(store => this.form.patchValue(store.data.vozidlo))
    );

    /*
    this.subscription = this.dataService.store.subscribe(
      (store: Store) => {
        this.data = store.data;
      }
    );  

    if (this.route && this.route.data) {
      this.route.data.subscribe(observableValue => {
        const pageData: any = observableValue['data'];
        if (pageData) {
          this.data = pageData;
        }
      });
    } */
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
    // this.dataService.updateVozidlo(this.form.value);
    this.dataService.getVozidloCKP(this.form.value.rz).subscribe((vozidlo: IVozidlo) => {
      this.alertService.success('Vozidlo updated', { keepAfterRouteChange: true });
      this.router.navigate(['./udaje'], { relativeTo: this.route });
      this.loading = false;
    });
  }

}
