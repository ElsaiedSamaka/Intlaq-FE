import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-truncated-text',
  templateUrl: './truncated-text.component.html',
  styleUrls: ['./truncated-text.component.css'],
})
export class TruncatedTextComponent implements OnInit {
  @Input() htmlContent: any = '';
  text = `Day 07 of the challenge #100DaysOfCode I was wondering what I can do with #tailwindcss,
          so just started building Twitter UI using Tailwind and so far it looks so promising.
          I will post my code after completion. [07/100] #WomenWhoCode #CodeNewbie`;

  truncatedText: string;
  isTruncated: boolean = false;
  isExpanded: boolean = false;
  @Input() currentTheme: string = '';

  constructor() {
    this.truncateText();
  }
  ngOnInit(): void {}

  truncateText() {
    const words = this.text.split(' ');
    if (words.length > 12) {
      this.isTruncated = !this.isTruncated;
      this.truncatedText = words.slice(0, 12).join(' ') + '...';
    } else {
      this.isTruncated = false;
      this.truncatedText = this.text;
    }
  }

  expandText(event: any) {
    event.stopPropagation();
    this.isExpanded = !this.isExpanded;
    this.isTruncated = false;
    this.truncatedText = this.text;
  }
}
