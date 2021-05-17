import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SjednaniComponent } from './sjednani.component';
import { SjednaniResolver } from './sjednani.resolver';

const routes: Routes = [
  {
    path: '',
    component: SjednaniComponent,
    resolve: {
      data: SjednaniResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SjednaniRoutingModule { }
