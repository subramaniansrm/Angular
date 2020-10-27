import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonMasterComponent } from './common-master.component';

const routes: Routes = [{
  path: '',
  component: CommonMasterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonMasterRoutingModule { }
