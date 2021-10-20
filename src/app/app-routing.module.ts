import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ZadaniComponent } from './zadani/zadani.component';
import { ZadaniUdajeComponent } from './zadani/zadani-udaje.component';
import { ZadaniOsobyComponent } from './zadani/zadani-osoby.component';
import { ZadaniRozsahComponent } from './zadani/zadani-rozsah.component';
import { ZaverComponent } from './zaver/zaver.component';

export const appRoutes: Routes = [
    { path: '', component: ZadaniComponent },
    { path: 'udaje', component: ZadaniUdajeComponent },    
    { path: 'osoby', component: ZadaniOsobyComponent },    
    { path: 'rozsah', component: ZadaniRozsahComponent },            
    { path: 'zaver', component: ZaverComponent },
    { path: '**', redirectTo: '' }      
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {}