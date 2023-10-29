import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [UserCardComponent],
  exports: [UserCardComponent],
})
export class ViewsModule {}
