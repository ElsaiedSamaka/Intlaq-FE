import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-jops-fyi',
  templateUrl: './jops-fyi.component.html',
  styleUrls: ['./jops-fyi.component.css'],
})
export class JopsFyiComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Input() currentUser: any = null;
  constructor() {}

  ngOnInit() {}
}
