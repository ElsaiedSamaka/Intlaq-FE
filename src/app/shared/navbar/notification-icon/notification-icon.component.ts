import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from 'src/core/services/socket.service';

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.css'],
})
export class NotificationIconComponent implements OnInit {
  @Input() currentUser: any = null;
  @Input() currentTheme: any = null;
  @Input() newMessageNotifications: any[] = [];
  showNotifcationDropDown: boolean = false;
  constructor(private socketService: SocketService) {}

  ngOnInit() {}
  toggleNotificationDropDown() {
    this.showNotifcationDropDown = !this.showNotifcationDropDown;
  }
}
