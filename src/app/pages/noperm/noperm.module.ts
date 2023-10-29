import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NopermRoutingModule } from './noperm-routing.module';
import { NopermComponent } from './noperm.component';

@NgModule({
  imports: [CommonModule, NopermRoutingModule],
  declarations: [NopermComponent],
})
export class NopermModule {}
