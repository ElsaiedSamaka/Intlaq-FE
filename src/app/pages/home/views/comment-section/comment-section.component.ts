import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { CommentsService } from 'src/core/services/comments.service';
import { RepliesService } from 'src/core/services/replies.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css'],
})
export class CommentSectionComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Input() article: any;
  @Input() currentUser: any;
  comments: any[] = [];
  comment: any;
  reply: any;
  content: string = '';
  showToast: boolean = false;
  toastMessage: string = '';
  editOrSubmitOrReply: string = 'submit';
  constructor(
    private commentsService: CommentsService,
    private dataService: DataService,
    private repliesservice: RepliesService
  ) {}

  ngOnInit() {
    this.getAll();
  }
  getAll(): void {
    let articleId = this.article.id;
    this.commentsService.getAll(articleId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
  postComment(event: any): void {
    event.stopPropagation();
    let articleId = this.article.id;
    let isAnonymous = this.dataService.isAnonymous$.value;
    let comment = {
      content: this.content,
      postId: articleId,
      userId: this.currentUser.id,
      isAnonymous: isAnonymous,
    };
    this.commentsService.post(comment).subscribe({
      next: () => {
        this.content = '';
      },
      error: (err) => {
        this.content = '';
        this.toggleToast(err.message);
      },
      complete: () => {
        this.content = '';
      },
    });
  }
  handleRemovedComment(removedComment: any): void {
    this.comments = this.commentsService.comments$.value;
  }
  handleCommentEdit(commentToEdit: any): void {
    this.editOrSubmitOrReply = 'edit';
    this.comment = commentToEdit;
    this.content = commentToEdit.content;
  }
  editComment(commentId: any): void {
    this.commentsService.put(commentId, { content: this.content }).subscribe({
      next: () => {
        this.content = '';
      },
      error: () => {},
      complete: () => {
        this.editOrSubmitOrReply = 'submit';
      },
    });
  }
  handleCommentReply(commentToReply: any): void {
    this.editOrSubmitOrReply = 'reply';
    this.comment = commentToReply;
  }
  handleReplyEdit(replyToEdit: any): void {
    this.editOrSubmitOrReply = 'editReply';
    this.reply = replyToEdit;
    this.content = replyToEdit.content;
  }
  editReply(): void {
    this.repliesservice
      .put(this.reply.id, { content: this.content })
      .subscribe({
        next: () => {
          this.content = '';
        },
        error: () => {},
        complete: () => {
          this.editOrSubmitOrReply = 'submit';
        },
      });
  }
  postReply(): void {
    let isAnonymous = this.dataService.isAnonymous$.value;

    let reply = {
      content: this.content,
      commentId: this.comment.id,
      isAnonymous: isAnonymous,
    };
    this.repliesservice.post(reply).subscribe({
      next: () => {
        this.content = '';
      },
      error: () => {},
      complete: () => {
        this.editOrSubmitOrReply = 'submit';
      },
    });
  }
  handleRemovedReply(value: any): void {
    console.log(value);
  }
  cancel(): void {
    this.editOrSubmitOrReply = 'submit';
    this.content = '';
  }
  toggleToast(toastMessage: string) {
    this.showToast = !this.showToast;
    this.toastMessage = toastMessage;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }
}
