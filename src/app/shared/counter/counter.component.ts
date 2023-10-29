import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  @Input() label: string = '';
  @Output() counterEmitter= new EventEmitter<number>();
  value: number = 0;
  constructor() { }

  ngOnInit() {
    this.counterEmitter.emit(this.value)
  }
  increment = () => {
    if (this.value < 11)
      this.value += 1;
    this.counterEmitter.emit(this.value);
    
  }
  decrement = () => {
    if (this.value > 0)
      this.value -= 1;
    this.counterEmitter.emit(this.value);
    
  }

}
