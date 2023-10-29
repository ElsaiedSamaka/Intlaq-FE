import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SortDirective } from './sort.directive';
import { MyDirectiveDirective } from './my-directive.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [	SortDirective,
      MyDirectiveDirective
   ],
  exports: [SortDirective],
})
export class MyCommonModule {}
