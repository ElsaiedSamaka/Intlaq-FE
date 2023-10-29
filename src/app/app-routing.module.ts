import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'index',
    // canLoad:[],
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'dashboard',
    // canLoad: [AuthGuard],
    // canActivate: [AdminGaurd],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    title: 'dashboard',
  },
  {
    path: 'noperm',
    loadChildren: () =>
      import('./pages/noperm/noperm.module').then((m) => m.NopermModule),
    title: 'noperm',
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./pages/notfound/notfound.module').then((m) => m.NotfoundModule),
    title: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
