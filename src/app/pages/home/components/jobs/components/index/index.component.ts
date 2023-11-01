import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  searchForm: FormGroup;
  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private postService: PostsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      jobTitle: [''],
      company: [''],
      workplace: [''],
      location: [''],
    });
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
    const { jobTitle, company, workplace, location } = this.searchForm.value;

    this.postService.getJobs(jobTitle, company, workplace, location).subscribe({
      next: (response) => {
        console.log('response', response);
        this.jobs = this.postService.jobs$.value;
      },
      error: (err) => {
        console.log('error getting jobs', err);
      },
      complete: () => {},
    });
  }
}
