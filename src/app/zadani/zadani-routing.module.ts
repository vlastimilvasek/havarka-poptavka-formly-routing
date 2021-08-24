import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZadaniComponent } from './zadani.component';
import { ZadaniResolver } from './zadani.resolver';
import { ZadaniUdajeComponent } from './zadani-udaje.component';
import { ZadaniOsobyComponent } from './zadani-osoby.component';
import { ZadaniRozsahComponent } from './zadani-rozsah.component';

const routes: Routes = [
  {
    path: '',
    component: ZadaniComponent,
    resolve: {
      data: ZadaniResolver
    },
    data: { animation: 0}
  },
  {
    path: 'udaje',
    component: ZadaniUdajeComponent,
    data: { animation: 1 }
  },
  {
    path: 'osoby',
    component: ZadaniOsobyComponent,
    data: { animation: 2 }
  },
  {
    path: 'rozsah',
    component: ZadaniRozsahComponent,
    data: { animation: 3 }
  }      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZadaniRoutingModule { }
