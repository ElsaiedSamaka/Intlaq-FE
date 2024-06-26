import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { PostsService } from '../services/posts.service';

@Injectable()
export class ArticleResolverService implements Resolve<any> {
  constructor(private router: Router, private postsService: PostsService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = route.params;
    return this.postsService.getArticleById(id).pipe(
      catchError((err) => {
        console.log('error issued with template resolver', err);
        this.router.navigateByUrl('not-found');
        return EMPTY;
      })
    );
  }
}
