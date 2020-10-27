import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialMasterRoutingModule } from './material-master-routing.module';
import { MaterialMasterComponent } from './material-master.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MaterialMasterComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialMasterRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class MaterialMasterModule { }
