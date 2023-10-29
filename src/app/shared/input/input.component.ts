import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Input() required: boolean = false;
  @Input() minlength: number = 0;
  @Input() maxlength: number = 10;
  @Input() pattern: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() autocomplete: string = 'on';
  @Input() autofocus: boolean = false;
  @Input() tabindex: number = 0;
  @Input() size: number = 50;
  @Input() title: string = '';
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() description: string = '';
  @Input() options: any[] = [];
  @Input() width: number = 0;
  @Output() fileChange: EventEmitter<any> = new EventEmitter<any>();
  showErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
  currentTheme: string = '';
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
  // prevent nonnumaric inputs of tel type input
  onKeyDown(event: KeyboardEvent): void {
    // const charCode = event.which || event.keyCode;
    // if (charCode < 48 || charCode > 57) {
    //   event.preventDefault();
    // } else {
    //   return;
    // }
  }
  handleFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileChange.emit(file);
    }
  }
  handleNumberInput(event: any): void {
    if (event.target.value.length >= event.target.maxLength) {
      event.preventDefault();
    }
  }
  handleCheckBoxChange(event: any): void {
    if (event.target.checked) {
      this.control.setValue(true);
    } else {
      this.control.setValue(false);
    }
  }
  handleSelectChange(event: any): void {
    this.control.setValue(event.target.value);
  }
  handleRadioChange(event: any): void{
    console.log('handleRadioChange [event]',event.target.value);
    this.control.setValue(event.target.value);
  }
}
