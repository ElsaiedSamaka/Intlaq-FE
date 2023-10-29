import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-actions-icon',
  templateUrl: './actions-icon.component.html',
  styleUrls: ['./actions-icon.component.css'],
})
export class ActionsIconComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Input() id: string = '';
  @Input() currentUser: any = null;
  @Input() article: any = null;
  showActionsDDL: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: string = '';
  constructor(private postsService: PostsService) {}

  ngOnInit() {}
  handleActions(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = !this.showActionsDDL;
  }
  handlePostRemove(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = false;
    this.postsService.deleteById(this.id).subscribe({
      next: (removedPost) => {},
      error: (err) => {
        this.toggleToast('error', err);
        console.log('error while removeing post [actions-icon component]', err);
      },
      complete: () => {},
    });
    this.toggleToast('success', 'post removed');
  }
  handlePostReport(event: any): void {
    event.stopPropagation();
    this.showActionsDDL = false;
    this.toggleToast('success', 'post reported');
    console.log('handlePostReport');
  }
  toggleToast(toastType: string, toastMessage: string) {
    this.showToast = true;
    (this.toastType = toastType), (this.toastMessage = toastMessage);
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }
}
