import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { SocketService } from './socket.service';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  conversation$ = new BehaviorSubject<any[]>([]);
  conversations$ = new BehaviorSubject<any[]>([]);

  constructor(
    private socketService: SocketService,
    private authService: AuthService,
    private apiService: ApiService
  ) {}
  getMessages(senderId: number, recipientId: number) {
    try {
      this.socketService.socket.emit('getMessages', {
        sender: senderId,
        recipient: recipientId,
      });

      this.socketService.socket.on('messages', (messages) => {
        this.conversation$.value['messages'].push(messages);
      });
    } catch (error) {
      console.log('err', error);
    }
  }

  sendMessage(
    senderId: number,
    receiverId: number,
    message: string,
    conversationId?: number
  ) {
    this.socketService.socket.emit('sendMessage', {
      senderId: senderId,
      receiverId: receiverId,
      conversationId: conversationId,
      message: message,
    });
    this.socketService.socket.on('newMessage', (newMessage) => {
      this.getConversations(this.authService.getCurrentUser().id);
      // so am gonna subscribe to conversation$ to get the latest and then check
      this.conversation$.subscribe((conversation) => {
        if (!conversation['messages'].includes(newMessage)) {
          this.conversation$.value['messages'].push(newMessage);
        }
      });
    });
  }
  getConversations(currentUserId: number): void {
    this.socketService.socket.emit('getConversations', {
      currentUserId: currentUserId,
    });
    this.socketService.socket.on('emittedConversation', (conversations) => {
      this.conversations$.next(conversations);
    });
  }
  getConversationById(id: string): Observable<any> {
    return this.apiService.get(`/api/conversations/${id}`).pipe(
      tap((res) => {
        this.conversation$.next(res);
      })
    );
  }
  deleteConversationById(id: string): Observable<any> {
    return this.apiService.delete(`/api/conversations/${id}`).pipe(
      tap((deleteItem) => {
        let updatedItems = this.conversations$.value.filter(
          (item) => item.id != deleteItem.id
        );
        this.conversations$.next(updatedItems);
      })
    );
  }
  joinRoom(conversationId: any, userId: any) {
    console.log('conversationId', conversationId);
    this.socketService.socket.emit('join', {
      conversationId: conversationId,
      userId: userId,
    });
  }

  leaveRoom(conversationId: any, userId: any) {
    console.log('conversationId', conversationId);
    this.socketService.socket.emit('leave', {
      conversationId: conversationId,
      userId: userId,
    });
  }
}
