import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users$ = new BehaviorSubject<any[]>([]);
  users = this.users$.asObservable;
  data$ = new BehaviorSubject<any[]>([]);

  constructor(
    private apiService: ApiService,
    private socketService: SocketService
  ) {}
  getAll(page?: number, size?: number): Observable<any[]> {
    return this.apiService.get(`/api/users?page=${page}&size=${size}`).pipe(
      tap((response) => {
        let { rows: users } = response;
        let sortedUsers = users.sort((a, b) => b.id - a.id);
        this.users$.next(sortedUsers);
        this.data$.next(response);
      }),
      catchError((err) => {
        // handle error and return a more specific error message
        const errorMessage = err?.error?.message ?? 'An error occurred.';
        return throwError(errorMessage);
      })
    );
  }
  getUsers(email: string): Observable<any[]> {
    return this.apiService.get(`/api/users?email=${email}`).pipe(
      tap((res) => {
        const { rows: users } = res;
        this.users$.next(users);
      })
    );
  }
  getById(id: string): Observable<any> {
    return this.apiService.get(`/api/users/${id}`);
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete(`/api/users/${id}`).pipe(
      tap((deletedUser) => {
        let updatedUsers = this.users$.value.filter(
          (user) => user.id != deletedUser.id
        );
        // ✔️✔️
        console.log('updated users', updatedUsers);
        // ToDo: comment below statement and instead get the data directly sorted
        let sortedUsers = updatedUsers.sort((a, b) => b.id - a.id);
        this.users$.next(sortedUsers);
      })
    );
  }
  post(item: any): Observable<any> {
    return this.apiService.post('/api/users', item).pipe(
      tap((addedUser) => {
        // remove from the bottom
        this.users$.value.splice(-1, 1);
        // add to the top
        this.users$.value.unshift(addedUser);
      })
    );
  }
  put(id: string, item: any): Observable<any> {
    return this.apiService.put(`/api/users/${id}`, item).pipe(
      tap((updatedUser) => {
        const index = this.users$.value.indexOf(id);
        this.users$.value.splice(index, 1, updatedUser);
      })
    );
  }
  follow(item: any): Observable<any> {
    return this.apiService.post('/api/users/follow', item).pipe(
      tap((followedUser) => {
        this.socketService.socket.emit('newFollow', {
          userId: item.followerId,
          followedUserId: item.followingId,
        });
      })
    );
  }
  unfollow(item: any): Observable<any> {
    return this.apiService.post('/api/users/unfollow', item).pipe(
      tap((unFollowedUser) => {
        this.socketService.socket.emit('unFollow', {
          userId: item.followerId,
          unfollowedUserId: item.followingId,
        });
      })
    );
  }
  getFollowing(): Observable<any[]> {
    return this.apiService
      .get('/api/users/following')
      .pipe(tap((userfollowing) => {}));
  }
  getFollowers(): Observable<any[]> {
    return this.apiService
      .get('/api/users/followers')
      .pipe(tap((userfollowers) => {}));
  }
}
