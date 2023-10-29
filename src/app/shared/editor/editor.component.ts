import {
  Component,
  DoCheck,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit, DoCheck {
  @Output() html: EventEmitter<any> = new EventEmitter<any>();
  htmlContent: string = '';
  tabs: any[] = [
    { id: 1, label: 'Edit' },
    { id: 2, label: 'Preview' },
  ];
  selectedTabId = 1;
  selectTab(id: number) {
    this.selectedTabId = id;
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    maxHeight: '10rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'yes',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    //  upload: (file: File) => { ... }
    uploadWithCredentials: false,
    sanitize: true,
  };
  constructor() {}
  ngDoCheck(): void {
    if (this.htmlContent != '') {
      this.emitHTMLContent();
    }
  }

  ngOnInit() {}
  emitHTMLContent() {
    this.html.emit(this.htmlContent);
  }
}
