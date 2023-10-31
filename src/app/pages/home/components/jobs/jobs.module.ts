import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndexComponent } from './components/index/index.component';
import { JobsRoutingModule } from './jobs-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ViewsModule } from './views/views.module';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { DetailedComponent } from './components/detailed/detailed.component';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    CommonModule,
    SharedModule,
    ViewsModule,
    JobsRoutingModule,
  ],
  declarations: [IndexComponent, PlaceholderComponent, DetailedComponent],
})
export class JobsModule {}
