import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DetailedComponent } from './components/detailed/detailed.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: 'not-found', component: NotFoundComponent },
      {
        path: ':id',
        component: DetailedComponent,
        // resolve: { conversation: ConversationResolverService },
      },
      { path: '', component: PlaceholderComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
