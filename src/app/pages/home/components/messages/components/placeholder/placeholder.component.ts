import { Component, OnInit } from '@angular/core';
import { Validators } from 'ngx-editor';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';
import { ChatService } from 'src/core/services/chat.service';
import { UsersService } from 'src/core/services/users.service';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css'],
})
export class PlaceholderComponent implements OnInit {
  currentTheme: string = '';
  currentUser: any;
  showNewConversationModal: boolean = false;
  validators = Validators;
  isFormValid: boolean = false;
  showUsersDropdown: boolean = false;
  users: any[] = [];
  selectedUsers: any[] = [];
  email: string = '';
  message: string = '';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private usersService: UsersService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
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
  openNewConversationModal() {
    this.showNewConversationModal = true;
  }
  closeNewConversationModal() {
    this.showNewConversationModal = false;
  }
  checkFormStatus(value: any) {
    switch (value) {
      case 'INVALID':
        this.isFormValid = false;
        break;
      case 'VALID':
        this.isFormValid = true;
        break;

      default:
        break;
    }
  }
  onFormSubmitted() {
    if (this.selectedUsers.length == 0) return;
    // post form value
    let senderId = this.currentUser.id;
    let receiverId = this.selectedUsers[0].id;
    console.log('this.selectedUsers[0]', this.selectedUsers[0].id);
    let message = this.message;

    this.chatService.sendMessage(senderId, receiverId, message);
    this.message = '';
    this.closeNewConversationModal();
  }
  handleEmailChange() {
    this.getUsers();
  }
  getUsers() {
    this.usersService
      .getUsers(this.email)
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (users) => {
          this.users = this.usersService.users$.value;
        },
        error: (err) => {
          console.log('error while retrieving users', err);
        },
        complete: () => {},
      });
  }
  handleUserSelect(event) {
    const userId = event.target.value;
    const isChecked = event.target.checked;
    const user = this.users.find((u) => u.id == userId);
    const selectedIndex = this.selectedUsers.findIndex((u) => u.id == userId);

    if (isChecked) {
      if (selectedIndex === -1) {
        this.selectedUsers.splice(0, 1, user);
      }
      this.showUsersDropdown = false;
      this.email = '';
    } else {
      if (selectedIndex !== -1) {
        this.selectedUsers.splice(selectedIndex, 1);
      }
      this.email = '';
      this.showUsersDropdown = false;
    }
  }
}
