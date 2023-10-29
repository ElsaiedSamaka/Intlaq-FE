import { Component, Input, OnInit } from '@angular/core';
import { Validators } from 'ngx-editor';
import { UsersService } from 'src/core/services/users.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css'],
})
export class GeneralInfoComponent implements OnInit {
  @Input() currentTheme = '';
  @Input() currentUser = null;
  isUserFormEditMode: boolean = true;
  isUserFormValid: boolean = false;
  validators = Validators;
  constructor(private usersService: UsersService) {}

  ngOnInit() {}

  updateInfo(data: any): void {
    const currentUserID = this.currentUser.id;
    this.usersService.put(currentUserID, data).subscribe({
      next: (response) => {},
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
  checkUserFormStatus(value: any) {
    switch (value) {
      case 'INVALID':
        this.isUserFormValid = false;
        break;
      case 'VALID':
        this.isUserFormValid = true;
        break;

      default:
        break;
    }
  }
  onUserFormSubmitted(data: any) {
    if (!this.isUserFormValid) return;
    this.isUserFormEditMode = !this.isUserFormEditMode;
    this.updateInfo(data);
  }
  toggleUserFormMode(): void {
    this.isUserFormEditMode = !this.isUserFormEditMode;
  }
}
