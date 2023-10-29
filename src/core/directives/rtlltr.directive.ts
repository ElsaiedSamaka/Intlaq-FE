import { Directive, ElementRef, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Directive({
  selector: '[rtlltr]',
})
export class RtlltrDirective implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private languageService: LanguageService // Replace with your language service
  ) {}

  ngOnInit() {
    this.subscribeToLang();
  }
  subscribeToLang(): void {
    this.languageService.currentLanguage$.subscribe((arg) => {
      switch (arg) {
        case 'ar':
          this.setDirection('rtl');
          break;
        case 'en':
          this.setDirection('ltr');
          break;

        default:
          break;
      }
    });
  }
  private setDirection(direction: 'rtl' | 'ltr') {
    const element = this.elementRef.nativeElement;
    switch (direction) {
      case 'rtl':
        element.classList.remove('ltr');
        element.classList.add('rtl');
        break;
      case 'ltr':
        element.classList.remove('rtl');
        element.classList.add('ltr');
        break;

      default:
        break;
    }
  }
}
