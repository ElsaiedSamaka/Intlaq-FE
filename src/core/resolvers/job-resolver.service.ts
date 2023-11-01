import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { PostsService } from '../services/posts.service';
import { EMPTY, catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class JobResolverService {
  currentUser: any;
  constructor(
    private router: Router,
    private postsService: PostsService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = route.params;
    return this.postsService.getJobById(id, this.currentUser.id).pipe(
      catchError((err) => {
        console.log('error issued with template resolver', err);
        this.router.navigateByUrl('not-found');
        return EMPTY;
      })
    );
  }
}
