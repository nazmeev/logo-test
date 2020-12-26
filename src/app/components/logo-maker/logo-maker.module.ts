import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoMakerRoutingModule } from './logo-maker-routing.module';
import { LogosComponent } from './logos/logos.component';
import { LogoComponent } from './logo/logo.component';
import { FigureCanvasComponent } from './figure-canvas/figure-canvas.component';
import { TextCanvasComponent } from './text-canvas/text-canvas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LogosComponent, 
    LogoComponent, 
    FigureCanvasComponent,
    TextCanvasComponent,
  ],
  imports: [
    CommonModule,
    LogoMakerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class LogoMakerModule { }
