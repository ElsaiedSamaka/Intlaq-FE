import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JobCardComponent } from './job-card/job-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [JobCardComponent],
  exports: [JobCardComponent],
})
export class ViewsModule {}
