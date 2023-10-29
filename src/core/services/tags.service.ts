import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  tags$ = new BehaviorSubject<any[]>([]);

  constructor(private apiService: ApiService) {}
  getAllTags(): Observable<any[]> {
    return this.apiService.get(`/api/tags`).pipe(
      tap((tags) => {
        this.tags$.next(tags);
      })
    );
  }
  getAll(tagName?: any): Observable<any[]> {
    return this.apiService.get(`/api/tags?name=${tagName}`).pipe(
      tap((tags) => {
        this.tags$.next(tags);
      })
    );
  }
  post(item: any): Observable<any> {
    return this.apiService.post('/api/tags', item).pipe(
      tap((addedItem) => {
        this.tags$.value.push(addedItem);
      })
    );
  }
}
