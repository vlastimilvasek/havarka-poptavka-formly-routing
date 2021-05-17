import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, pipe } from 'rxjs';
import { catchError, delay, distinctUntilChanged, map } from 'rxjs/operators';
import { ParamsService } from './params.service';

export interface IVozidlo {
  druh?: number;
  kategorie?: any;
  uziti?: number;
  znacka?: number;
  model?: number;
  specifikace?: string;
  barva?: string;
  objem_motoru?: number;
  vykon_motoru?: number;
  rok_vyroby?: number;
  stav_tachometr?: number;
  hmotnost?: number;
  pocet_dveri?: number;
  pocetsedadel?: number;
  palivo?: number;
  rz?: string;
  vtp?: string;
  vin?: string;
}

export class Vozidlo {
  constructor(  
    druh?: number,
    kategorie?: any,
    uziti?: number,
    znacka?: number,
    model?: number,
    specifikace?: string,
    barva?: string,
    objem_motoru?: number,
    vykon_motoru?: number,
    rok_vyroby?: number,
    stav_tachometr?: number,
    hmotnost?: number,
    pocet_dveri?: number,
    pocetsedadel?: number,
    palivo?: number,
    rz?: string,
    vtp?: string,
    vin?: string,
    ) {}    
}

export class OKalkulace {
  constructor(
      public id?: any,
      public vozidlo: Vozidlo = new Vozidlo(),
      public createdAt: any = new Date()
  ) {}
}

export interface Kalkulace {
    id?: any;
    vozidlo: IVozidlo;
    createdAt: any;
}

export interface Store {
  data: Kalkulace;
  lists: {
    znacka: any,
    model: any,
    druh: any,
    rok_vyroby: any,
    palivo: any,
    uziti: any,
    najezd: any,
    pojistnik: any,
    provozovatel: any,
    psc: any,
    castiobce: any,
    ppsc: any,
    pcastiobce: any
  },
  settings: {};
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private storeSubject = new BehaviorSubject<Store>({} as Store);
  public store = this.storeSubject.asObservable().pipe(distinctUntilChanged());
  
  /*
  private _data = new BehaviorSubject<Kalkulace>({} as Kalkulace);
  private baseUrl = 'https://56e05c3213da80110013eba3.mockapi.io/api';
  private dataStore: { data: Kalkulace } = { data: {} as Kalkulace };
  readonly data = this._data.asObservable();
  */

  constructor(
    private http: HttpClient,
    private paramsService: ParamsService,
  ) {}

  initStore() {
    const store = {
      data: { vozidlo: {  }, createdAt: new Date() } as Kalkulace,
      lists: {
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
      },
      settings: {},
    };
    this.paramsService.getOsoby().subscribe(items => {
      store.lists.pojistnik = items;
      store.lists.provozovatel = items;
    });
    this.paramsService.getDruhVozidla().subscribe(items => {
      store.lists.druh = items;
    });
    this.paramsService.getPalivo().subscribe(items => {
      store.lists.palivo = items;
    }); 
    this.paramsService.getUziti().subscribe(items => {
      store.lists.uziti = items;
    }); 
    this.paramsService.getNajezd().subscribe(items => {
      store.lists.najezd = items;
    });                
    this.storeSubject.next(store);
  }

  getStore(): Store {
    return this.storeSubject.value;
  }

  getVozidloCKP(rz: string): Observable<IVozidlo> {
    const params = new HttpParams({});
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic c3Jvdm5hdmFjOkthbGVuZGFyMjk=', // + btoa('srovnavac:Kalendar29'),
      'Access-Control-Allow-Origin': '*'
    });
    const path = '/api/ckp-vozidlo.php?co=slavia&udaj=' + rz;
    return this.http.get(`${path}`, { headers, params })
      .pipe(map(
        data => {
          const vozidlo = {
            rz: data['vozidlo'].spz,
            vtp: data['vozidlo'].cislotp,
            vin: data['vozidlo'].vin,
            hmotnost: Number(data['vozidlo'].celkovahmotnost),
            objem_motoru: Number(data['vozidlo'].zdvihovyobjem),
            vykon_motoru: Number(data['vozidlo'].vykonmotoru),
          } as IVozidlo;           
          this.updateVozidlo(vozidlo);
          return vozidlo;
        }
    ));
  }

  updateVozidlo(params: IVozidlo) {
      let store = this.getStore();
      /*
      const {rz, vtp, vin} = params;
      
      const vozidlo = {
        rz: rz || store.data.vozidlo.rz,
        vtp: vtp || store.data.vozidlo.vtp,
        vin: vin || store.data.vozidlo.vin,
      };    
      */  
      store.data.vozidlo = Object.assign(store.data.vozidlo, params);
      // this.dataStore.data.vozidlo = vozidlo;
      // this._data.next(Object.assign({}, this.dataStore).data);
      this.storeSubject.next(store);
  }

  /*
  create(kalk: Kalkulace) {
    this.http.post<Kalkulace>(`${this.baseUrl}/todos`, JSON.stringify(kalk)).subscribe(data => {
      this.dataStore.data = data;
      this._data.next(Object.assign({}, this.dataStore).data);
    }, error => console.log('Could not create kalkulace.'));
  }

  update(kalk: Kalkulace) {
    this.http.put<Kalkulace>(`${this.baseUrl}/todos/${kalk.id}`, JSON.stringify(kalk)).subscribe(data => {
      this.dataStore.data = data;

      this._data.next(Object.assign({}, this.dataStore).data);
    }, error => console.log('Could not update kalkulace.'));
  }
  */

}