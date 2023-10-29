import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RepliesService } from 'src/core/services/replies.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css'],
})
export class ReplyComponent implements OnInit, OnChanges {
  @Input() currentTheme: string = '';
  @Input() currentUser: any;

  @Input() reply: any;
  @Output() emitRemovedReply: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitEditReply: EventEmitter<any> = new EventEmitter<any>();
  showActionsDDL: boolean = false;

  constructor(private repliesService: RepliesService) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.reply && changes.reply.currentValue) {
      // Update the reply value
      this.reply = changes.reply.currentValue;
    }
  }
  handleActions(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = !this.showActionsDDL;
  }
  handleReplyRemove(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = false;
    this.repliesService.deleteById(this.reply.id).subscribe({
      next: (removedReply) => {
        this.emitRemovedReply.emit(removedReply);
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
  // handleCommentReport(event: any): void {
  //   event.stopPropagation();
  //   this.showActionsDDL = false;
  //   console.log('handleCommentReport');
  // }
  handleReplyEdit(event: any): void {
    this.emitEditReply.emit(this.reply);
  }
}
