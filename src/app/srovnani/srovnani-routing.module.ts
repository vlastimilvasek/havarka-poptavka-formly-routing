import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SrovnaniComponent } from './srovnani.component';
import { SrovnaniResolver } from './srovnani.resolver';

const routes: Routes = [
  {
    path: '',
    component: SrovnaniComponent,
    resolve: {
      data: SrovnaniResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SrovnaniRoutingModule { }
