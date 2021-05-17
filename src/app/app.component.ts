import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService, Kalkulace, Store } from './core';
// import { TranslateService } from '@ngx-translate/core';
// import { ActivatedRoute } from '@angular/router';
import { slideRightLeftAnimation } from './core/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideRightLeftAnimation]  
})
export class AppComponent {
  title = 'havarka';
  layouthelper = true;

  private subscription: Subscription;
  data: Kalkulace;

  constructor( 
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.initStore();
    this.subscription = this.dataService.store.subscribe(
      (store: Store) => {
        this.data = store.data;
      }
    );
  }  

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
 }  
}
