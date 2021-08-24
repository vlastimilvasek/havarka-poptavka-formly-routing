import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService, ParamsService, IVozidla, Vozidla } from './core';
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

  data: IVozidla;

  constructor( 
    private dataService: DataService,
    private paramsService: ParamsService
  ) {}

  ngOnInit() {
    this.data = new Vozidla(null);
    this.dataService.data = this.data;
    this.paramsService.initParams();
  }  

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
 }  
}
