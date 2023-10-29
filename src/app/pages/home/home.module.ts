import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticleResolverService } from 'src/core/resolvers/article-resolver.service';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { HomeRoutingModule } from './home-routing.module';
import { ViewsModule } from './views/views.module';
import { LatestContactsComponent } from './views/latest-contacts/latest-contacts.component';
import { JopsFyiComponent } from './views/jops-fyi/jops-fyi.component';

@NgModule({
  imports: [
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    CommonModule,
    SharedModule,
    ViewsModule,
    HomeRoutingModule,
  ],
  declarations: [
    IndexComponent,
    HomeComponent,
    BlogDetailsComponent,
    CompaniesComponent,
    LatestContactsComponent,
    JopsFyiComponent,
  ],
  providers: [ArticleResolverService],
})
export class HomeModule {}
