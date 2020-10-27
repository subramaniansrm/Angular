import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialMasterComponent } from './material-master.component';

const routes: Routes = [{
  path: '',
  component: MaterialMasterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialMasterRoutingModule { }
