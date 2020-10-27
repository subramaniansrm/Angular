import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [


  {
    path: "", redirectTo: 'dashboard', pathMatch: 'full',
  },

  // {
  //   path: "", redirectTo: 'login', pathMatch: 'full',
  // },
  {
    path: "login",
    loadChildren: "./pages/auth/login/login.module#LoginModule"
  },


  {
    path: "dashboard",
    loadChildren: "./pages/dashboard/dashboard.module#DashboardModule",
  },
  {
    path: "materialMaster",
    loadChildren: "./pages/material-master/material-master.module#MaterialMasterModule"
  },
  {
    path: "financeMaster",
    loadChildren: "./pages/finance-master/finance-master.module#FinanceMasterModule"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
