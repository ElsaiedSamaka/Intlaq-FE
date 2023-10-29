import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/core/services/language.service';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.css'],
})
export class LangSelectorComponent implements OnInit {
  @Input() currentTheme: any = null;

  showLangDDL: boolean = false;
  DEFAULT_LANGUAGE: string;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    // Get the language from local storage or set a default value
    this.DEFAULT_LANGUAGE = localStorage.getItem('DEFAULT_LANGUAGE') || 'en';
  }

  ngOnInit() {
    this.translate.use(this.DEFAULT_LANGUAGE);
  }

  changeLanguage(language: string) {
    this.translate.use(language);
    this.DEFAULT_LANGUAGE = language;
    localStorage.setItem('DEFAULT_LANGUAGE', language);
    this.languageService.setCurrentLanguage(language);
    this.toggleLangDDL();
  }

  toggleLangDDL(): void {
    this.showLangDDL = !this.showLangDDL;
  }
}
