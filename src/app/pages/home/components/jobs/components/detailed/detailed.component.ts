import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css'],
})
export class DetailedComponent implements OnInit {
  job;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.getJob();
  }
  getJob(): void {
    this.route.data.subscribe((job) => {
      this.job = job;
    });
  }
}
