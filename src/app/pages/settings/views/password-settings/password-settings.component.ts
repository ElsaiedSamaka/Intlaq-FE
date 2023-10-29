import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/core/services/auth.service';
import { MatchPassword } from 'src/core/validators/match-password';

@Component({
  selector: 'app-password-settings',
  templateUrl: './password-settings.component.html',
  styleUrls: ['./password-settings.component.css'],
})
export class PasswordSettingsComponent implements OnInit {
  @Input() currentTheme = '';
  @Input() currentUser = null;
  validators = Validators;
  passwordForm: FormGroup;
  isPasswordFormEditMode: boolean = true;
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showPasswordConfirmation: boolean = false;
  constructor(
    private authService: AuthService,
    private matchPassword: MatchPassword
  ) {}

  ngOnInit() {
    this.passwordForm = new FormGroup(
      {
        currentPassword: new FormControl(this.currentUser.password),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(25),
        ]),
        passwordConfirmation: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(25),
        ]),
      },
      { validators: [this.matchPassword.validate] }
    );
  }

  onPasswordFormSubmitted() {
    if (this.passwordForm.invalid) return;
    const data = this.passwordForm.value;
    this.authService.updatePassword(data).subscribe({
      next: (response) => {
        console.log('response', response);
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
    this.isPasswordFormEditMode = !this.isPasswordFormEditMode;
  }
  togglePasswordFormMode(): void {
    this.isPasswordFormEditMode = !this.isPasswordFormEditMode;
  }
  toggleCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }
  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }
  togglePasswordConfirmation() {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
  }
}
