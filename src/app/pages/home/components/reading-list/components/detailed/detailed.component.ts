import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css'],
})
export class DetailedComponent implements OnInit {
  data: any = {};
  currentTheme: string = '';

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.getBlog();
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
  getBlog() {
    this.route.data.subscribe((data) => {
      this.data = data;
    });
  }
}
