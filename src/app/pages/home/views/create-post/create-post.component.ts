import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { PostsService } from 'src/core/services/posts.service';
import { SocketService } from 'src/core/services/socket.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Input() currentUser: any = null;
  showCreateNewPostModal: boolean = false;
  validators = Validators;
  isArticleFormValid: boolean = false;
  isArticleFormSubmitted: boolean = false;
  isJobFormValid: boolean = false;
  isJobFormSubmitted: boolean = false;
  receivedHTMLContent: string = '';
  receivedTags: any[] = [];
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: string = '';
  postAs;
  tabs: any[] = [
    { id: 1, label: 'Article' },
    { id: 2, label: 'Job' },
  ];
  selectedTab = 'Article';
  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  constructor(
    private postsService: PostsService,
    private dataService: DataService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.dataService.isAnonymous$.subscribe((postAs) => {
      this.postAs = postAs;
    });
  }
  openCreateNewPostModal() {
    this.showCreateNewPostModal = true;
  }
  closeCreateNewPostModal() {
    this.showCreateNewPostModal = false;
  }
  checkArticleFormStatus(value: any) {
    switch (value) {
      case 'INVALID':
        this.isArticleFormValid = false;
        break;
      case 'VALID':
        this.isArticleFormValid = true;
        break;

      default:
        break;
    }
  }
  onArticleFormSubmitted(article: any) {
    if (!this.isArticleFormValid) return;
    let tagsIds = this.receivedTags.map((tag) => tag.id);
    let content = this.receivedHTMLContent;
    let userId = this.currentUser.id;
    let isAnonymous = this.dataService.isAnonymous$.value;
    let postType = this.selectedTab;
    article.append('postType', 'Article');
    article.append('tagsIds', tagsIds);
    article.append('content', content);
    article.append('userId', userId);
    article.append('isAnonymous', isAnonymous);
    this.isArticleFormSubmitted = true;
    this.postArticle(article);
  }
  handleRecievedTags(tags: any): void {
    this.receivedTags = tags;
  }
  handleHTML(html: any) {
    this.receivedHTMLContent = html;
  }
  postArticle(article: any): void {
    this.postsService.post(article).subscribe({
      next: (response) => {
        this.toggleToast('success', 'post publish !');
      },
      error: (err) => {
        this.isArticleFormSubmitted = false;
        this.toggleToast('error', err.message);
        this.closeCreateNewPostModal();
      },
      complete: () => {
        this.isArticleFormSubmitted = false;
        this.closeCreateNewPostModal();
        // once a user post an article we wanna reset the array of the recieved tags and the html content
        this.receivedTags = [];
        this.receivedHTMLContent = '';
        if (!this.dataService.isAnonymous$.value) {
          this.socketService.socket.emit('newPost', {
            userId: this.currentUser.id,
            article: article,
          });
        }
      },
    });
  }
  postJop(job: any): void {
    this.postsService.post(job).subscribe({
      next: (response) => {
        this.toggleToast('success', 'Job publish !');
      },
      error: (err) => {
        this.isJobFormSubmitted = false;
        this.toggleToast('error', err.message);
        this.closeCreateNewPostModal();
      },
      complete: () => {
        this.isJobFormSubmitted = false;
        this.closeCreateNewPostModal();
        if (!this.dataService.isAnonymous$.value) {
          this.socketService.socket.emit('newJop', {
            userId: this.currentUser.id,
            job: job,
          });
        }
      },
    });
  }
  checkJobFormStatus(value: any) {
    switch (value) {
      case 'INVALID':
        this.isJobFormValid = false;
        break;
      case 'VALID':
        this.isJobFormValid = true;
        break;

      default:
        break;
    }
  }
  onJobFormSubmitted(job: any) {
    if (!this.isJobFormValid) return;
    let userId = this.currentUser.id;
    let isAnonymous = this.dataService.isAnonymous$.value;
    job.append('postType', 'Job');
    job.append('userId', userId);
    job.append('isAnonymous', isAnonymous);
    this.isJobFormSubmitted = true;
    this.postJop(job);
  }
  toggleToast(toastType: any, toastMessage: any): void {
    this.showToast = true;
    this.toastType = toastType;
    this.toastMessage = toastMessage;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
