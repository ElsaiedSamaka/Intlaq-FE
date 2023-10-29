import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommentsService } from 'src/core/services/comments.service';
import { PostsService } from 'src/core/services/posts.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit, OnChanges {
  @Input() currentUser: any = null;
  @Input() currentTheme: string = '';
  @Input() article: any = {};
  showFollowingPopOver: boolean = false;
  showCommentInput: boolean = false;
  content: string = '';
  alreadySavedArticle;
  alreadyLovedArticle;
  saveCount: number = 0;
  loveCount: number = 0;
  noOfComments: number = 0;
  followingCount: number = 0;
  followersCount: number = 0;
  constructor(
    private commentsService: CommentsService,
    private postsService: PostsService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const { loveCount, saveCount, comments } = this.article;
    this.saveCount = saveCount;
    this.loveCount = loveCount;
    this.noOfComments = comments.length;
    // check if current already follow the creator of the article
    // this.isFollowing();
    // this.followingCount = this.article.user.following.length;
    // this.followersCount = this.article.user.follower.length;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.article && changes.article.currentValue) {
      // Update the article value
      this.article = changes.article.currentValue;
    }
  }

  toggleCommentSection(event: any) {
    event.stopPropagation();
    this.showCommentInput = !this.showCommentInput;
  }
  handleArticleActions(event: any): void {
    event.stopPropagation();
  }
  handleCommentInput(event: any): void {
    event.stopPropagation();
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
      error: (err) => {},
      complete: () => {
        this.noOfComments = this.commentsService.comments$.value.length;
      },
    });
  }
  saveArticle(event: any): void {
    event.stopPropagation();
    const articleId = this.article.id;
    const userId = this.currentUser.id;

    if (!this.articleAlreadyExistOnSaved()) {
      this.postsService.save(articleId, userId).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this.saveCount += 1;
          this.updateArticle(); // Update the article object
        },
      });
    } else {
      this.postsService.unsave(articleId, userId).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this.saveCount -= 1;
          this.updateArticle(); // Update the article object
        },
      });
    }
  }
  updateArticle(): void {
    this.postsService.getById(this.article.id).subscribe({
      next: (updatedArticle: any) => {
        this.article = updatedArticle;
      },
      error: () => {},
    });
  }
  articleAlreadyExistOnSaved(): boolean {
    const alreadySavedArticle = this.article.saved_posts.find(
      (item: any) => item.userId === this.currentUser.id
    );

    return !!alreadySavedArticle;
  }
  favArticle(event: any): void {
    event.stopPropagation();
    const articleId = this.article.id;
    const userId = this.currentUser.id;

    if (!this.articleAlreadyExistOnFaved()) {
      this.postsService.fav(articleId, userId).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this.loveCount += 1;
          this.updateArticle(); // Update the article object
        },
      });
    } else {
      this.postsService.unfav(articleId, userId).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this.loveCount -= 1;
          this.updateArticle(); // Update the article object
        },
      });
    }
  }

  articleAlreadyExistOnFaved(): boolean {
    const alreadyLovedArticle = this.article.loved_posts.find(
      (item: any) => item.userId === this.currentUser.id
    );

    return !!alreadyLovedArticle;
  }
}
