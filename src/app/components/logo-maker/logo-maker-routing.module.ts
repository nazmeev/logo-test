import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoComponent } from './logo/logo.component';
import { LogosComponent } from './logos/logos.component';

const routes: Routes = [
  {
    path: '',
    component: LogosComponent,
  },
  {
    path: 'create',
    component: LogoComponent,
  },
  {
    path: 'logo/:id',
    component: LogoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogoMakerRoutingModule { }
