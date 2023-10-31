import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JobCardComponent } from './job-card/job-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [JobCardComponent],
  exports: [
     JobCardComponent
   ]
})
export class ViewsModule {}
