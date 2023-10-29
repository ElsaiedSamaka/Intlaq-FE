import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.css'],
})
export class SwitchThemeComponent implements OnInit {
  currentTheme: string = '';
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
  toggleTheme(themeToSet: string) {
    this.themeService.setTheme(themeToSet);
  }
}
