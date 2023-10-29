import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RtlltrDirective } from 'src/core/directives/rtlltr.directive';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './components/signin/signin.component';
import { SignoutComponent } from './components/signout/signout.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewsModule } from '../home/views/views.module';
import { NumaricDirective } from 'src/core/directives/numaric.directive';

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
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  declarations: [SigninComponent, SignupComponent, SignoutComponent,NumaricDirective],
  providers: [RtlltrDirective],
})
export class AuthModule {}
