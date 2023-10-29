import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { TemplateService } from '../services/template.service';
import { ChatService } from '../services/chat.service';

@Injectable({
  providedIn: 'root',
})
export class ConversationResolverService implements Resolve<any> {
  constructor(
    private router: Router,
    private chatService: ChatService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = route.params;
    return this.chatService.getConversationById(id).pipe(
      catchError((err) => {
        console.log('error issued with template resolver', err);
        this.router.navigateByUrl('index/not-found');
        return EMPTY;
      })
    );
  }
}
