import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() fields: any[] = [];
  @Input() isDisabled: boolean = false;
  @Output() submitted = new EventEmitter<any>();
  @Output() formStatus = new EventEmitter<any>();
  @Output() togglePasswordState = new EventEmitter<boolean>();
  @Input() showPassword: boolean = false;
  @Input() enctype: string = '';
  @Output() resetFormEmitter: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const group: any = {};
    this.fields.forEach((field) => {
      group[field.name] = [
        field.value,
        Validators.compose(field.validators || []),
      ];
    });
    this.form = this.fb.group(group);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isDisabled && changes.isDisabled.currentValue) {
      this.isDisabled = changes.isDisabled.currentValue;
    }
  }
  ngAfterViewInit(): void {
    this.emitFormStatus();
  }
  submitForm() {
    if (this.form.valid) {
      const formData = this.prepareForm();
      this.submitted.emit(formData);
    }
  }
  emitFormStatus() {
    this.form.statusChanges.subscribe({
      next: (status) => {
        this.formStatus.emit(status);
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
  handleFileChange(file: any) {
    this.form.patchValue({
      file_img: file,
    });
  }
  prepareForm() {
    let formData = new FormData();
    Object.entries(this.form.value).forEach(([key, value]) => {
      if (typeof value === 'string') {
        formData.append(key, value);
      } else if (value instanceof Blob) {
        formData.append(key, value, value['name']);
      }
    });
    return formData;
  }
  togglePassword(): void {
    if (!this.isDisabled) {
      this.togglePasswordState.emit(!this.showPassword);
    }
  }
  resetForm(): void {
    this.form.reset();
    // this.resetFormEmitter.emit()
  }
}
