import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailedComponent } from './components/detailed/detailed.component';
import { IndexComponent } from './components/index/index.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MessagesRoutingModule } from './messages-routing.module';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MessagesRoutingModule,
    SharedModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    IndexComponent,
    PlaceholderComponent,
    DetailedComponent,
    NotFoundComponent,
    SettingsComponent,
  ],
})
export class MessagesModule {}
