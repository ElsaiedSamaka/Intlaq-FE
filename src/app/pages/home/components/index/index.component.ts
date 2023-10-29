import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';
import { ChatService } from 'src/core/services/chat.service';
import { SocketService } from 'src/core/services/socket.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  currentUser: any;
  currentTheme: string = '';
  conversations: any[] = [];

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private socketService: SocketService,
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
    this.emmitCurrentUser();
    this.getConversations();
  }
  // emmit current User
  emmitCurrentUser() {
    this.socketService.socket.emit('currentUser', {
      userId: this.currentUser.id,
    });
  }
  getConversations() {
    this.chatService.getConversations(this.currentUser.id);
    this.chatService.conversations$.pipe(debounceTime(100)).subscribe(() => {
      this.conversations = this.chatService.conversations$.value;
      this.joinRooms();
      this.leaveRooms();
    });
  }
  joinRooms(): void {
    console.log('joinRooms called');
    const userId = this.currentUser.id;
    this.conversations.forEach((conversation) => {
      this.chatService.joinRoom(conversation.id, userId);
    });
  }
  leaveRooms() {
    console.log('leaveRooms called');
    const userId = this.currentUser.id;
    this.conversations.forEach((conversation) => {
      this.chatService.leaveRoom(conversation.id, userId);
    });
  }
}
