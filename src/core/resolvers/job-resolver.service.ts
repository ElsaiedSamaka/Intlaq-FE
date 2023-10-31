import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { PostsService } from '../services/posts.service';
import { EMPTY, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobResolverService {
  constructor(private router: Router, private postsService: PostsService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = route.params;
    return this.postsService.getJobById(id).pipe(
      catchError((err) => {
        console.log('error issued with template resolver', err);
        this.router.navigateByUrl('not-found');
        return EMPTY;
      })
    );
  }
}
