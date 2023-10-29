import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/core/services/auth.service';
import { LanguageService } from 'src/core/services/language.service';
import { SocketService } from 'src/core/services/socket.service';
import { LoadingService } from './shared/services/loading.service';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(
    private loadingService: LoadingService,
    private themeService: ThemeService,
    private languageService: LanguageService,
    private socketService: SocketService,
    private translate: TranslateService,
    private renderer: Renderer2,
    private authService: AuthService
  ) {
    this.loading$ = this.loadingService.loading$;
  }
  ngOnInit(): void {
    this.themeService.getCurrentTheme();
    this.getCurrentLanguage();
  }
  getCurrentLanguage(): void {
    this.languageService.currentLanguage$.subscribe((language) => {
      const isRTL = language === 'ar';

      // Set lang attribute
      this.renderer.setAttribute(document.documentElement, 'lang', language);

      // Set dir attribute
      this.renderer.setAttribute(
        document.documentElement,
        'dir',
        isRTL ? 'rtl' : 'ltr'
      );
    });
  }
}
