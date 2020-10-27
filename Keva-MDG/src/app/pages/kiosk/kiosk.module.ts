import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { KioskComponent } from './kiosk.component';
import { KioskRoutingModule } from './kiosk-routing.module';

@NgModule({
  declarations: [KioskComponent],
  imports: [
    CommonModule,
    SharedModule,
    KioskRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class KioskModule { }
