import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
//import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: 'dashboard',
    loadChildren: () => import('./pages/reports/dashboard/dashboard.module').then(
      m => m.DashboardModule)
  },
  /*{
    path: "reportes/categoria",
    loadChildren: () =>
      import("./pages/reports/report-category/report-category.module").then(
        (mod) => mod.ReportCategoryModule
      ),
  },*/

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
