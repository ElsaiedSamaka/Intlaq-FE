import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css'],
})
export class UserAvatarComponent implements OnInit {
  @Input() currentTheme: any = null;
  @Input() currentUser: any = null;
  showDropDownTree: boolean = false;
  constructor() {}

  ngOnInit() {}
  toggleDropDownTree() {
    this.showDropDownTree = !this.showDropDownTree;
  }
}
