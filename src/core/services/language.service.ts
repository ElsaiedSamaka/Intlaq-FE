import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  currentLanguage$: BehaviorSubject<string> = new BehaviorSubject<string>('en'); // Default language
  constructor() {
    // Get the language from local storage or set a default value
    const DEFAULT_LANGUAGE = localStorage.getItem('DEFAULT_LANGUAGE') || 'en';
    this.currentLanguage$.next(DEFAULT_LANGUAGE);
  }
  getCurrentLanguage(): string {
    return this.currentLanguage$.value;
  }

  setCurrentLanguage(language: string): void {
    this.currentLanguage$.next(language);
  }
}
