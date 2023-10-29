import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ProgrammingLanguagesService } from 'src/core/services/programming-languages.service';

@Component({
  selector: 'programing-lang-input',
  templateUrl: './programing-lang-input.component.html',
  styleUrls: ['./programing-lang-input.component.css'],
})
export class ProgramingLangInputComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Output() programmingLangEmitter = new EventEmitter<any>(null);
  programingLanguageResault: any[] = [];
  programmingLang: string = '';
  tagId: any;
  showProgrammingLangDropDown: boolean = false;
  selectedProgramingLangs: any[] = [];
  constructor(
    private programmingLanguagesService: ProgrammingLanguagesService
  ) {}

  ngOnInit() {}
  handleProgrammingLangSelect(event: any): void {
    event.stopPropagation();
    const programmingLangId = event.target.value;
    const isChecked = event.target.checked;
    const programmingLang = this.programingLanguageResault.find(
      (u) => u.id == programmingLangId
    );
    const selectedIndex = this.selectedProgramingLangs.findIndex(
      (u) => u.id == programmingLangId
    );

    if (isChecked) {
      if (selectedIndex === -1 && this.selectedProgramingLangs.length <= 4) {
        this.selectedProgramingLangs.push(programmingLang);
        this.programmingLangEmitter.emit(this.selectedProgramingLangs);
      }
      this.showProgrammingLangDropDown = false;
      this.programmingLang = '';
    } else {
      if (selectedIndex !== -1) {
        this.selectedProgramingLangs.splice(selectedIndex, 1);
      }
      this.programmingLang = '';
      this.showProgrammingLangDropDown = false;
    }
  }
  handleTagsSearch(event: any): void {
    event.stopPropagation();
    const label = event.target.value;
    this.programmingLanguagesService
      .getProgramingLanguageByName(label)
      .subscribe({
        next: (response) => {
          this.programingLanguageResault = response;
        },
        error: (err) => {
          console.log('err', err);
        },
      });
  }
  // handleSpacebarTab(event: any): void {
  //   // event.stopPropagation();
  //   // if (event.code === 'Space' && this.tag.trim().length > 0) {
  //   //   this.tagsService.post({ name: this.tag }).subscribe({
  //   //     next: (tag) => {
  //   //       if (this.selectedTags.length <= 4) {
  //   //         this.selectedTags.push(tag);
  //   //         this.tagsEmitter.emit(this.selectedTags);
  //   //       }
  //   //     },
  //   //     error: (error) => {
  //   //       console.log('error', error);
  //   //     },
  //   //     complete: () => {
  //   //       this.tag = '';
  //   //       this.showTagsDropDown = false;
  //   //     },
  //   //   });
  //   // } else if (event.code === 'Space') {
  //   //   // Prevent input of whitespace by preventing the default key behavior
  //   //   event.preventDefault();
  //   // }
  // }
  removeSelectedTag(i: number) {
    this.selectedProgramingLangs.splice(i, 1);
    this.programmingLangEmitter.emit(this.selectedProgramingLangs);
  }
  toggleProgrammingLangsDropDown() {
    this.showProgrammingLangDropDown = !this.showProgrammingLangDropDown;
  }
}
