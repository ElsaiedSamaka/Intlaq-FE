import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from 'src/core/services/socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() currentUser: any = null;
  @Input() currentTheme: any = null;
  constructor(private socketService: SocketService) {}

  ngOnInit() {
  }

}
