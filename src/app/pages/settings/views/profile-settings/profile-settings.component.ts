import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Validators } from 'ngx-editor';
import { AuthService } from 'src/core/services/auth.service';
import { UsersService } from 'src/core/services/users.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
})
export class ProfileSettingsComponent implements OnInit, OnChanges {
  @Input() currentTheme = '';
  @Input() currentUser = null;
  isProfileFormValid: boolean = false;
  isProfileFormEditMode: boolean = false;
  showProfilePicture: boolean = false;
  isProfileFormSubmitted: boolean = false;
  validators = Validators;
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentUser) {
      this.currentUser = changes.currentUser.currentValue;
    }
  }

  updateProfileImg(data: any): void {
    const currentUserID = this.currentUser.id;
    this.isProfileFormSubmitted = true;
    this.authService.updateAvatar(data).subscribe({
      next: (response) => {},
      error: (err) => {
        this.toggleProfilePictureForm();
        this.isProfileFormSubmitted = false;
        console.log('err', err);
      },
      complete: () => {
        this.isProfileFormSubmitted = false;
        this.toggleProfilePictureForm();
      },
    });
  }
  checkProfileFormStatus(value: any) {
    switch (value) {
      case 'INVALID':
        this.isProfileFormValid = false;
        break;
      case 'VALID':
        this.isProfileFormValid = true;
        break;

      default:
        break;
    }
  }
  onProfileFormSubmitted(data: any) {
    if (!this.isProfileFormValid) return;
    this.updateProfileImg(data);
  }
  resetProfileForm(value: any) {
    console.log('value of reseting form', value);
  }
  toggleProfilePictureForm() {
    this.showProfilePicture = !this.showProfilePicture;
  }
  subscribeToCurrentUser(): void {
    this.authService.currentUser$.subscribe({
      next: (currentUser) => {
        this.currentUser = currentUser;
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
}
