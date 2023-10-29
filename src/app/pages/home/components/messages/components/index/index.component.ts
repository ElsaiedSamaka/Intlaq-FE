import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';
import { ChatService } from 'src/core/services/chat.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit, OnDestroy {
  currentTheme: string = '';
  currentUser: any;
  conversations: any[] = [];
  conversationIdx: any;
  showConversationAction: boolean = false;
  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
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
    this.getConversations();
  }

  getConversations() {
    this.chatService.getConversations(this.currentUser.id);
    this.chatService.conversations$.pipe(debounceTime(100)).subscribe(() => {
      this.conversations = this.chatService.conversations$.value;
      this.joinRooms();
    });
  }
  toggleConversationAction(event: any, index: any): void {
    event.stopPropagation();
    this.conversationIdx = index;
    this.showConversationAction = !this.showConversationAction;
  }
  handleConversationRemove(id: any): void {
    this.chatService.deleteConversationById(id).subscribe((res) => {});
  }

  joinRooms(): void {
    const userId = this.currentUser.id;
    this.conversations.forEach((conversation) => {
      this.chatService.joinRoom(conversation.id, userId);
    });
  }
  ngOnDestroy() {
    this.leaveRooms();
  }
  leaveRooms() {
    const userId = this.currentUser.id;
    this.conversations.forEach((conversation) => {
      this.chatService.leaveRoom(conversation.id, userId);
    });
  }
}
