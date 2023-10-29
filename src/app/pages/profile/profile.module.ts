import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ViewsModule } from './views/views.module';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }), // Import TranslateModule here
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    ViewsModule,
  ],
  declarations: [HomeComponent],
})
export class ProfileModule {}
