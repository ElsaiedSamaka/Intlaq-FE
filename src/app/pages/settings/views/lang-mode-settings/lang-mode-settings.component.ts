import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { LanguageService } from 'src/core/services/language.service';

@Component({
  selector: 'app-lang-mode-settings',
  templateUrl: './lang-mode-settings.component.html',
  styleUrls: ['./lang-mode-settings.component.css'],
})
export class LangModeSettingsComponent implements OnInit {
  @Input() currentTheme = '';
  @Input() currentUser = null;
  DEFAULT_LANGUAGE: string;

  constructor(
    private themeService: ThemeService,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    // Get the language from local storage or set a default value
    this.DEFAULT_LANGUAGE = localStorage.getItem('DEFAULT_LANGUAGE') || 'en';
  }

  ngOnInit() {
    this.translate.use(this.DEFAULT_LANGUAGE);
  }
  toggleTheme(event: Event) {
    const themeToSet = event.target['value'];
    this.themeService.setTheme(themeToSet);
  }
  toggleLang(event: Event) {
    const langToSet = event.target['value'];
    this.translate.use(langToSet);
    this.DEFAULT_LANGUAGE = langToSet;
    localStorage.setItem('DEFAULT_LANGUAGE', langToSet);
    this.languageService.setCurrentLanguage(langToSet);
  }
}
