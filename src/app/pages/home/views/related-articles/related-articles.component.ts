import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from 'src/core/services/posts.service';

@Component({
  selector: 'app-related-articles',
  templateUrl: './related-articles.component.html',
  styleUrls: ['./related-articles.component.css'],
})
export class RelatedArticlesComponent implements OnInit {
  @Input() currentTheme: string = '';
  @Input() currentUser: Object = {};
  @Input() article: Object = {};
  relatedArticles: any[] = [];
  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.getPostsByTagId();
  }
  getPostsByTagId(): void {
    const tags = this.article['tags'].map((tag) => tag.id);
    this.postsService.getPostsByTags(tags).subscribe({
      next: (response) => {
        console.log('response', response);
        this.relatedArticles = response;
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }
}
