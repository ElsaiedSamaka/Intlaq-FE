import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-FYI-taps',
  templateUrl: './FYI-taps.component.html',
  styleUrls: ['./FYI-taps.component.css'],
})
export class FYITapsComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Input() currentUser: any = null;
  selectedTap: string = 'For you';

  constructor(private dataService: DataService) {}

  ngOnInit() {}
  selecteTap(tab: string): void {
    this.selectedTap = tab;
    this.dataService.FYI$.next(tab);
  }
}
