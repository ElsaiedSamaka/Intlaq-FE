import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent implements OnInit, AfterViewInit {
  @Input() currentTheme: string = '';
  @Input() currentUser: any = null;
  @Input() FYI: any;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  posts: any[] = [];
  isLoading: boolean = false; // Flag to indicate loading state
  constructor(private postsService: PostsService) {}

  ngOnInit() {
    switch (this.FYI) {
      case 'For you':
        this.getAll();
        break;
      case 'Following':
        this.getPostsByFollowing();
        break;
      default:
        break;
    }
    this.subscribeToPosts$();
  }
  ngAfterViewInit() {
    this.addScrollListener();
  }
  addScrollListener(): void {
    const scrollElement = this.scrollContainer.nativeElement;
    scrollElement.addEventListener(
      'scroll',
      this.scrollHandler.bind(this),
      true
    );
  }
  scrollHandler(event: Event): void {
    const scrollElement = this.scrollContainer.nativeElement;
    const isScrolledToBottom =
      scrollElement.scrollTop + scrollElement.clientHeight >=
      scrollElement.scrollHeight;

    if (isScrolledToBottom) {
      // Reached the bottom of the scroll container, fetch more posts
      this.fetchMorePosts();
    }
  }

  fetchMorePosts(): void {
    this.isLoading = true; // Set loading state to true
    switch (this.FYI) {
      case 'For you':
        this.postsService.getMoreForyouPosts().subscribe({
          next: () => {},
          error: () => {},
          complete: () => {
            this.isLoading = false; // Set loading state to false
          },
        });
        break;
      case 'Following':
        this.postsService.getMoreFollowingPosts(this.currentUser.id).subscribe({
          next: () => {},
          error: () => {},
          complete: () => {
            this.isLoading = false; // Set loading state to false
          },
        });
        break;
      default:
        break;
    }
  }
  getAll(): void {
    this.postsService.getAll().subscribe({
      next: (response) => {
        this.posts = this.postsService.posts$.value;
      },
      error: (err) => {
        console.log('err on [getAll] TimelineComponent', err);
      },
      complete: () => {},
    });
  }
  getPostsByFollowing(): void {
    this.postsService.getPostsByFollowing(this.currentUser.id).subscribe({
      next: (response) => {
        this.posts = this.postsService.posts$.value;
      },
      error: (err) => {
        console.log('err on [getPostsByFollowing] TimelineComponent', err);
      },
      complete: () => {},
    });
  }
  subscribeToPosts$(): void {
    this.postsService.posts$.subscribe({
      next: (response) => {
        this.posts = response;
      },
      error: (error) => {
        console.log(
          'error while reterieving posts [timeline component]',
          error
        );
      },
      complete: () => {},
    });
  }

}
