import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgrammingLanguagesService {
  programmingLanguages$ =new BehaviorSubject<any[]>([]);
  constructor(private apiService: ApiService) { }
  getProgramingLanguageByName(name:string): Observable<any[]>{
   return this.apiService.get(`/api/programming-languages/byName?name=${name}`).pipe(
      tap((programmingLanguages) => {
        this.programmingLanguages$.next(programmingLanguages);
      })
    );
  }
  getAll(): Observable<any[]> {
    return this.apiService.get(`/api/programming-languages`).pipe(
      tap((programmingLanguages) => {
        this.programmingLanguages$.next(programmingLanguages);
      })
    );
  }
  post(item: any): Observable<any> {
    return this.apiService.post('/api/programming-languages', item).pipe(
      tap((addedItem) => {
        this.programmingLanguages$.value.push(addedItem);
      })
    );
  }
}
