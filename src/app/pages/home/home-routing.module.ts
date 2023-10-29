import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleResolverService } from 'src/core/resolvers/article-resolver.service';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'timeline',
        component: HomeComponent,
        title: 'Home',
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('../home/components/jobs/jobs.module').then(
            (m) => m.JobsModule
          ),
        title: 'Jobs',
      },
      { path: 'companies', component: CompaniesComponent, title: 'Companies' },
      {
        path: 'messages',
        loadChildren: () =>
          import('../home/components/messages/messages.module').then(
            (m) => m.MessagesModule
          ),
        title: 'Messages',
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('../../pages/notifications/notifications.module').then(
            (m) => m.NotificationsModule
          ),
        title: 'Notifications',
      },
      {
        path: 'reading-list',
        loadChildren: () =>
          import('../home/components/reading-list/reading-list.module').then(
            (m) => m.ReadingListModule
          ),
        title: 'Reading-list',
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../../pages/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
        title: 'Profile',
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../../pages/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
        title: 'Settings',
      },
      {
        path: ':id',
        component: BlogDetailsComponent,
        resolve: { article: ArticleResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
