import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';
import { JobsService } from 'src/core/services/jobs.service';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css'],
})
export class DetailedComponent implements OnInit {
  data;
  currentTheme: string = '';
  currentUser: any;
  showConfirmationApplyModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private authService: AuthService,
    private jobsService: JobsService
  ) {}

  ngOnInit() {
    this.getJob();
    this.getCurrentTheme();
    this.getCurrentUser();
  }
  getJob(): void {
    this.route.data.subscribe((data) => {
      this.data = data;
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
  toggleConfirmationApplyModal() {
    this.showConfirmationApplyModal = !this.showConfirmationApplyModal;
  }
  applyJob() {
    this.jobsService
      .createApplication(this.data.job.job.id, this.currentUser.id)
      .subscribe({
        next: () => {},
        error: (err) => {
          console.log('err', err);
        },
        complete: () => {
          this.toggleConfirmationApplyModal();
          this.getJob();
        },
      });
  }
}
