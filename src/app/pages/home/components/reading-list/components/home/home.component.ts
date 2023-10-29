import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentTheme: string = '';
  currentUser: any;
  savedArticles: any[] = [];
  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.getSavedPosts();
    this.getCurrentTheme();
    this.getCurrentUser();
  }
  getSavedPosts(): void {
    this.postsService.getSaved().subscribe({
      next: (savedArticles) => {
        this.savedArticles = this.postsService.savedPosts$.value;
      },
      error: (err) => {
        console.log('error while retrieving saved articles', err);
      },
      complete: () => {},
    });
  }
  getCurrentTheme(): void {
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
  getCurrentUser(): void {
    this.authService.currentUser$.subscribe({
      next: (currentUser) => {
        this.currentUser = currentUser;
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
  unsave(event: any, articleId: any): void {
    event.stopPropagation();
    this.postsService.unsave(articleId, this.currentUser.id).subscribe({
      next: (savedArticles) => {
        this.savedArticles = this.postsService.savedPosts$.value;
      },
      error: () => {},
      complete: () => {},
    });
  }
}
