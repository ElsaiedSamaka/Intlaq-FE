import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumaric]',
})
export class NumaricDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;

    // Remove non-numeric characters except for dots (.)
    inputValue = inputValue.replace(/[^0-9.]/g, '');

    // Replace multiple dots with a single dot
    inputValue = inputValue.replace(/\.{2,}/g, '.');

    // Update the input element's value
    inputElement.value = inputValue;
  }
}
