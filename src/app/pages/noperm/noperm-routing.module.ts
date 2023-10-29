import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopermComponent } from './noperm.component';

const routes: Routes = [
  {
    path: '',
    component: NopermComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NopermRoutingModule {}
