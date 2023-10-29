import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FYITapsComponent } from './FYI-taps/FYI-taps.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { CommentComponent } from './comment-section/comment/comment.component';
import { ReplyComponent } from './comment-section/reply/reply.component';
import { CompanyCardComponent } from './company-card/company-card.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ArticleCardComponent } from './related-articles/article-card/article-card.component';
import { RelatedArticlesComponent } from './related-articles/related-articles.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProgramingLangInputComponent } from './create-post/programing-lang-input/programing-langs-input.component';
import { TagsInputComponent } from './create-post/tags-input/tags-input.component';

@NgModule({
  imports: [
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
  ],
  declarations: [
    CompanyCardComponent,
    CreatePostComponent,
    TimelineComponent,
    ProgramingLangInputComponent,
    TagsInputComponent,
    CommentSectionComponent,
    RelatedArticlesComponent,
    CommentComponent,
    ReplyComponent,
    ArticleCardComponent,
    FYITapsComponent,
  ],
  exports: [
    CompanyCardComponent,
    CreatePostComponent,
    TimelineComponent,
    ProgramingLangInputComponent,
    TagsInputComponent,
    CommentSectionComponent,
    RelatedArticlesComponent,
    CommentComponent,
    ReplyComponent,
    ArticleCardComponent,
    FYITapsComponent,
  ],
})
export class ViewsModule {}
