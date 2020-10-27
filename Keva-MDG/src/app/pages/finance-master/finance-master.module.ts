import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceMasterRoutingModule } from './finance-master-routing.module';
import { FinanceMasterComponent } from './finance-master.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialMasterRoutingModule } from '../material-master/material-master-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [FinanceMasterComponent],
  imports: [
    CommonModule,
    FinanceMasterRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ]
})
export class FinanceMasterModule { }
