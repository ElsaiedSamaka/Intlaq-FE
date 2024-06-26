import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css'],
})
export class CompanyCardComponent implements OnInit {
  @Input() currentTheme: string = '';
  constructor() {}

  ngOnInit() {}
}
