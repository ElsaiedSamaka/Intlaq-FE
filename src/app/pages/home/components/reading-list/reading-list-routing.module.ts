import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleResolverService } from 'src/core/resolvers/article-resolver.service';
import { ArchiveComponent } from './components/archive/archive.component';
import { DetailedComponent } from './components/detailed/detailed.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: PlaceholderComponent },
      { path: 'archieve', component: ArchiveComponent, title: 'Archive box' },
      { path: 'not-found', component: NotFoundComponent, title: 'Not found' },
      {
        path: ':id',
        component: DetailedComponent,
        resolve: { article: ArticleResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadingListRoutingModule {}
