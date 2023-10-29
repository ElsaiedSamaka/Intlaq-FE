import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-settings',
  templateUrl: './social-settings.component.html',
  styleUrls: ['./social-settings.component.css'],
})
export class SocialSettingsComponent implements OnInit {
  @Input() currentTheme = '';
  @Input() currentUser = null;
  constructor() {}

  ngOnInit() {}
}
