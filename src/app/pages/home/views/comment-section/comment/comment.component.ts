import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentsService } from 'src/core/services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Input() currentUser: any;
  @Input() comment: any;
  @Output() emitRemovedComment: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitEditComment: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitReplyComment: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitRemovedReply: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitEditReply: EventEmitter<any> = new EventEmitter<any>();
  showFollowingPopOver: boolean = false;
  showActionsDDL: boolean = false;

  constructor(private commentsService: CommentsService) {}

  ngOnInit() {}
  toggleFollowingPopOver() {
    this.showFollowingPopOver = !this.showFollowingPopOver;
  }
  handleActions(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = !this.showActionsDDL;
  }
  handleCommentRemove(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = false;
    this.commentsService.deleteById(this.comment.id).subscribe({
      next: (removedComment) => {
        this.emitRemovedComment.emit(removedComment);
      },
      error: (err) => {
        console.log(
          'error while removeing comment [actions-icon component]',
          err
        );
      },
      complete: () => {},
    });
  }
  handleCommentReport(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = false;
    console.log('handleCommentReport');
  }
  handleCommentEdit(event: any): void {
    this.emitEditComment.emit(this.comment);
  }
  handleCommentReply(event: any): void {
    this.emitReplyComment.emit(this.comment);
  }
  handleRemovedReply(reply: any): void {
    this.emitRemovedReply.emit(reply);
  }
  handleReplyEdit(reply: any): void {
    this.emitEditReply.emit(reply);
  }
}
