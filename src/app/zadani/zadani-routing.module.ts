import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZadaniComponent } from './zadani.component';
import { ZadaniResolver } from './zadani.resolver';
import { ZadaniUdajeComponent } from './zadani-udaje.component';

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
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZadaniRoutingModule { }
