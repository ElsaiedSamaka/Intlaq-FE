import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { ConversationResolverService } from 'src/core/resolvers/conversation-resolver.service';
import { DetailedComponent } from './components/detailed/detailed.component';
import { IndexComponent } from './components/index/index.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: 'not-found', component: NotFoundComponent },
      { path: 'settings', component: SettingsComponent },
      {
        path: ':id',
        component: DetailedComponent,
        resolve: { conversation: ConversationResolverService },
      },
      { path: '', component: PlaceholderComponent },
    ],
  },
];

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
