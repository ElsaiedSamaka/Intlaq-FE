import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewsModule } from '../../views/views.module';
import { IndexComponent } from './components/index/index.component';
import { JobsRoutingModule } from './jobs-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, ViewsModule, JobsRoutingModule],
  declarations: [IndexComponent],
})
export class JobsModule {}
