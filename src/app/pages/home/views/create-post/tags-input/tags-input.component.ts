import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { TagsService } from 'src/core/services/tags.service';

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.css'],
})
export class TagsInputComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Output() tagsEmitter = new EventEmitter<any>(null);
  tag: string = '';
  tagId: any;
  tags: any[] = [];
  showTagsDropDown: boolean = false;
  selectedTags: any[] = [];
  theme: string = '';
  constructor(
    private themeService: ThemeService,
    private tagsService: TagsService
  ) {}

  ngOnInit() {
    this.getCurrentTheme();
  }
  handleTagSelect(event: any): void {
    const tagId = event.target.value;
    const isChecked = event.target.checked;
    const tag = this.tags.find((u) => u.id == tagId);
    const selectedIndex = this.selectedTags.findIndex((u) => u.id == tagId);

    if (isChecked) {
      if (selectedIndex === -1 && this.selectedTags.length <= 4) {
        this.selectedTags.push(tag);
        this.tagsEmitter.emit(this.selectedTags);
      }
      this.showTagsDropDown = false;
      this.tag = '';
    } else {
      if (selectedIndex !== -1) {
        this.selectedTags.splice(selectedIndex, 1);
      }
      this.tag = '';
      this.showTagsDropDown = false;
    }
  }
  handleTagsSearch(event: any): void {
    event.stopPropagation();
    const name = event.target.value;
    this.showTagsDropDown = true;
    this.tagsService
      .getAll(name)
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe({
        next: (res) => {
          this.tags = this.tagsService.tags$.value;
        },
        error: (error) => {},
        complete: () => {},
      });
  }
  handleSpacebarTab(event: any): void {
    event.stopPropagation();
    if (event.code === 'Space' && this.tag.trim().length > 0) {
      this.tagsService.post({ name: this.tag }).subscribe({
        next: (tag) => {
          if (this.selectedTags.length <= 4) {
            this.selectedTags.push(tag);
            this.tagsEmitter.emit(this.selectedTags);
          }
        },
        error: (error) => {
          console.log('error', error);
        },
        complete: () => {
          this.tag = '';
          this.showTagsDropDown = false;
        },
      });
    } else if (event.code === 'Space') {
      // Prevent input of whitespace by preventing the default key behavior
      event.preventDefault();
    }
  }
  removeSelectedTag(i: number) {
    this.selectedTags.splice(i, 1);
    this.tagsEmitter.emit(this.selectedTags);
  }
  getCurrentTheme() {
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });
  }
}
