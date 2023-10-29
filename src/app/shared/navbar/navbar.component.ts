import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from 'src/core/services/socket.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() currentUser: any = null;
  @Input() currentTheme: any = null;
  showSideBar: boolean = false;
  showSearchModal: boolean = false;
  newMessageNotifications: any[] = [];

  constructor(
    private dataService: DataService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.handleNewMessageNotification();
  }
  toggleSideBar() {
    this.showSideBar = !this.showSideBar;
    this.dataService.showSideBar.next(this.showSideBar);
  }
  toggleSearchModal(value?: any): void {
    this.showSearchModal = !this.showSearchModal;
  }
  handleNewMessageNotification() {
    // Listen for the newMessageNotification event
    this.socketService.socket.on('newMessageNotification', (message) => {
      // Handle the new message notification
      this.newMessageNotifications.push(message);
      // Update your UI or show a notification
    });
  }
}
