import { Component, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.css'],
})
export class WysiwygComponent implements OnInit {
  editor: Editor;
  html = '';

  constructor() {
    this.editor = new Editor();
  }

  ngOnInit() {}
  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
