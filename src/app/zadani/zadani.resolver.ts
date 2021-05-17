import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Kalkulace, DataService } from '../core';

@Injectable({providedIn: 'root'})
export class ZadaniResolver implements Resolve<Kalkulace> {
  
  constructor(
    private dataService: DataService,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return of(1);
    /*
    return this.dataService.data;*/
  }
  
}