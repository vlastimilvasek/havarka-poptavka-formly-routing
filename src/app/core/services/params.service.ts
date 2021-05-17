import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { catchError, map, tap } from 'rxjs/operators';
// import { ISrovnani, ISelectItem, ISjednaniResp } from '../../_interfaces/vozidla';
import { ROKY, DRUH, PALIVO, UZITI, OSOBY, NAJEZD } from '../../../assets/params/zakladni_nabidky';
import { ZNACKA, MODEL } from '../../../assets/params/znacka_model';
import { tap, delay, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class ISelectItem {
    value: string | number;
    label: string;
}

@Injectable()
export class ParamsService {

    constructor(private http: HttpClient) { }

    getOsoby(): Observable<ISelectItem[]> {
        return this.http.get<ISelectItem[]>('assets/params/osoby.json');
    }

    getDruhVozidla(): Observable<ISelectItem[]> {
        // cele pipe odmazat - jen pro ukazku
        return this.http.get<ISelectItem[]>('assets/params/druhVozidla.json').pipe(
            tap(val => {
                console.log('getData STARTED');
            }),
            delay(3000),
            finalize(() => {
                console.log('getData COMPLETED');
            })
        );
    }

    getRokVyroby() {
        return ROKY;
    }

    getPalivo(): Observable<ISelectItem[]> {
        return this.http.get<ISelectItem[]>('assets/params/palivo.json');
    }

    getUziti(): Observable<ISelectItem[]> {
        return this.http.get<ISelectItem[]>('assets/params/uziti.json');
    }

    getNajezd(): Observable<ISelectItem[]> {
        return this.http.get<ISelectItem[]>('assets/params/najezd.json');
    }

    getZnacka() {
        return ZNACKA;
    }

    getModel() {
        return MODEL;
    }

}
