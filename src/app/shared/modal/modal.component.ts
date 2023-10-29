import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Output() dismiss = new EventEmitter<boolean>();
  currentTheme: string = '';

  constructor(private el: ElementRef, private themeService: ThemeService) {}

  ngOnInit() {
    document.body.appendChild(this.el.nativeElement);
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
  ngOnDestory() {
    this.el.nativeElement.remove();
  }
  onDismissClick() {
    this.dismiss.emit(false);
  }
}
