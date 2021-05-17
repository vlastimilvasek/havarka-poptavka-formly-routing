import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'zadani',
    loadChildren: () => import('./zadani/zadani.module').then(m => m.ZadaniModule)
  },
  {
    path: 'zaver',
    loadChildren: () => import('./zaver/zaver.module').then(m => m.ZaverModule)
  },
  {
    path: 'srovnani',
    loadChildren: () => import('./srovnani/srovnani.module').then(m => m.SrovnaniModule)
  },
  {
    path: 'sjednani',
    loadChildren: () => import('./sjednani/sjednani.module').then(m => m.SjednaniModule)
  },
  { path: '', redirectTo: '/zadani', pathMatch: 'full'},
  { path: '**', redirectTo: '/zadani' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {}