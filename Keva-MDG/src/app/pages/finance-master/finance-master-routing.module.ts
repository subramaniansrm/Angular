import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanceMasterComponent } from './finance-master.component';

const routes: Routes = [{
  path: '',
  component: FinanceMasterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceMasterRoutingModule { }
