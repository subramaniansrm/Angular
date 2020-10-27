import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonMasterRoutingModule } from './common-master-routing.module';
import { CommonMasterComponent } from './common-master.component';


@NgModule({
  declarations: [CommonMasterComponent],
  imports: [
    CommonModule,
    CommonMasterRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ]
})
export class CommonMasterModule { }
