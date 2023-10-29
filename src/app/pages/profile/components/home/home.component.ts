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
  posts: any[] = [];
  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    this.getCurrentTheme();
    this.getPostsByUseId();
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
  getCurrentTheme(): void {
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
  getPostsByUseId(): void {
    this.postsService.getPostsByUseId(this.currentUser.id).subscribe({
      next: (response) => {
        this.posts = this.postsService.posts$.value;
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
}
