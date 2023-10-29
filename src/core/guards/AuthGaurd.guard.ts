import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return EMPTY;
    // this.authservice.signedin$.pipe(
    //   skipWhile((value) => value === false),
    //   take(1),
    //   tap((authenticated) => {
    //     if (!authenticated) {
    //       this.router.navigateByUrl('/');
    //     }
    //   })
    // );
  }
}
