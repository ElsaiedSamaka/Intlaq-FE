import { Component, Input, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { ChatService } from 'src/core/services/chat.service';

@Component({
  selector: 'app-latest-contacts',
  templateUrl: './latest-contacts.component.html',
  styleUrls: ['./latest-contacts.component.css'],
})
export class LatestContactsComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Input() currentUser: any = null;
  conversations: any[] = [];
  showConversationAction: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.getConversations();
  }
  getConversations() {
    this.chatService.getConversations(this.currentUser.id);
    this.chatService.conversations$.pipe(debounceTime(100)).subscribe(() => {
      this.conversations = this.chatService.conversations$.value;
    });
  }
}
