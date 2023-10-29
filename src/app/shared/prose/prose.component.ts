import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-prose',
  templateUrl: './prose.component.html',
  styleUrls: ['./prose.component.css'],
})
export class ProseComponent implements OnInit {
  currentTheme: string = '';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
}
