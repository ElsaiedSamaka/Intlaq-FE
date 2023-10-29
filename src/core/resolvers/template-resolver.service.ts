import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { TemplateService } from '../services/template.service';

@Injectable({
  providedIn: 'root',
})
export class TemplateResolverService implements Resolve<any> {
  constructor(
    private router: Router,
    private templateService: TemplateService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = route.params;
    return this.templateService.getById(id).pipe(
      catchError((err) => {
        console.log('error issued with template resolver', err);
        this.router.navigateByUrl('index/not-found');
        return EMPTY;
      })
    );
  }
}
