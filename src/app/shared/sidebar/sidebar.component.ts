import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from 'src/core/services/socket.service';
import { TagsService } from 'src/core/services/tags.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() currentTheme: any = null;
  newMessageNotifications: any[] = [];
  newNotifications: any[] = [];
  tags: any[] = [];
  subProgramsTree: any[] = [
    {
      id: 1,
      path: 'index',
      label: 'Home',
    },
    {
      id: 2,
      path: 'companies',
      label: 'Companies',
    },
    {
      id: 3,
      path: 'jobs',
      label: 'Jobs',
    },
    {
      id: 4,
      path: 'messages',
      label: 'Messages',
    },
    {
      id: 5,
      path: 'reading-list',
      label: 'Reading list',
    },
  ];
  showSideBar: boolean = false;
  constructor(
    private dataService: DataService,
    private tagsService: TagsService,
    private socketService: SocketService
  ) {}
  ngOnInit() {
    this.dataService.showSideBar.subscribe({
      next: (showSideBar) => {
        this.showSideBar = showSideBar;
      },
    });
    this.getAllTags();
    this.handleNewMessageNotification();
    this.handleNewNotification();
  }

  getAllTags(): void {
    this.tagsService.getAllTags().subscribe({
      next: (res) => {
        this.tags = res;
      },
      complete: () => {},
    });
  }
  handleNewMessageNotification() {
    // Listen for the newMessageNotification event
    this.socketService.socket.on('newMessageNotification', (message) => {
      // Handle the new message notification
      this.newMessageNotifications.push(message);
      // Update your UI or show a notification
    });
  }
  handleNewNotification() {
    this.socketService.socket.on('newNotification', (notification) => {
      this.newNotifications.push(notification);
      console.log('[1;32m', 'notification', notification);
    });
  }
}
