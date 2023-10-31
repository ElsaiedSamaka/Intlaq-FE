import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  currentTheme: string = '';
  currentUser: any;
  jobs: any[] = [];
  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private postService: PostsService
  ) {}

  ngOnInit() {
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
    this.authService.currentUser$.subscribe({
      next: (currentUser) => {
        this.currentUser = currentUser;
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
    this.getJobs();
  }
  getJobs(): void {
    this.postService.getJobs().subscribe({
      next: (response) => {
        this.jobs = this.postService.jobs$.value;
      },
      error: (err) => {
        console.log('error getting jobs', err);
      },
      complete: () => {
        console.log('jobs', this.jobs);
      },
    });
  }
}
