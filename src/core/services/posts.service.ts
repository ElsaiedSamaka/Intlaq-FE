import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { ApiService } from './api.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  posts$ = new BehaviorSubject<any[]>([]);
  jobs$ = new BehaviorSubject<any[]>([]);
  savedPosts$ = new BehaviorSubject<any[]>([]);
  lovedPosts$ = new BehaviorSubject<any[]>([]);
  currentPage = 0; // Current page of posts
  totalPages = 0; // Total number of pages

  constructor(
    private apiService: ApiService,
    private socketService: SocketService
  ) {}
  // get all posts
  getAll(): Observable<any[]> {
    return this.apiService.get(`/api/posts?page=${0}&size=${5}`).pipe(
      tap((response) => {
        const { rows: posts, totalPages, currentPage } = response;
        this.posts$.next(posts);
        this.totalPages = totalPages;
        this.currentPage = currentPage;
      })
    );
  }
  // get all jobs
  getJobs(): Observable<any[]> {
    return this.apiService.get(`/api/posts/jobs?page=${0}&size=${5}`).pipe(
      tap((response) => {
        const { rows: jobs, totalPages, currentPage } = response;
        this.jobs$.next(jobs);
        this.totalPages = totalPages;
        this.currentPage = currentPage;
      })
    );
  }
  getMoreForyouPosts(): Observable<any[]> {
    if (this.currentPage >= this.totalPages) {
      // No more pages to fetch
      // console.log('this.currentPage >= this.totalPages - 1');
      return of([]);
    }

    const nextPage = this.currentPage + 1;

    return this.apiService.get(`/api/posts?page=${nextPage}&size=5`).pipe(
      tap((response) => {
        const { rows: morePosts } = response;
        const currentPosts = this.posts$.value;
        this.posts$.next([...currentPosts, ...morePosts]);
        this.currentPage = nextPage;
      })
    );
  }
  getMoreFollowingPosts(userId: string): Observable<any[]> {
    if (this.currentPage >= this.totalPages) {
      // No more pages to fetch
      // console.log('this.currentPage >= this.totalPages - 1');
      return of([]);
    }

    const nextPage = this.currentPage + 1;

    return this.apiService
      .post(`/api/posts/following?page=${nextPage}&size=5`, {
        userId,
      })
      .pipe(
        tap((response) => {
          const { rows: morePosts } = response;
          const currentPosts = this.posts$.value;
          this.posts$.next([...currentPosts, ...morePosts]);
          this.currentPage = nextPage;
        })
      );
  }
  getArticleById(id: string): Observable<any> {
    return this.apiService.get(`/api/posts/${id}`);
  }
  getJobById(id: string): Observable<any>{
    return this.apiService.get(`/api/posts/jobs/${id}`)
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete(`/api/posts/${id}`).pipe(
      tap((deleteItem) => {
        console.log('deleteItem', deleteItem);
        let updatedItems = this.posts$.value.filter(
          (item) => item.id != deleteItem.id
        );
        console.log('updatedItems', updatedItems);
        this.posts$.next(updatedItems);
      })
    );
  }
  post(item: any): Observable<any> {
    return this.apiService.post('/api/posts', item).pipe(
      tap((addedItem) => {
        this.posts$.value.push(addedItem);
      })
    );
  }
  save(articlId: string, userId: string): Observable<any> {
    return this.apiService.post(`/api/posts/${articlId}/save`, { userId }).pipe(
      tap((savedPost) => {
        this.savedPosts$.value.push(savedPost);
      })
    );
  }
  unsave(articlId: string, userId: string): Observable<any> {
    return this.apiService
      .post(`/api/posts/${articlId}/unsave`, { userId })
      .pipe(
        tap((unsavedItem) => {
          let updatedItems = this.savedPosts$.value.filter(
            (item) => item.postId != unsavedItem.postId
          );
          this.savedPosts$.next(updatedItems);
        })
      );
  }
  getSaved(): Observable<any[]> {
    return this.apiService.get('/api/posts/user/saved-posts').pipe(
      tap((savedPosts) => {
        this.savedPosts$.next(savedPosts);
      })
    );
  }
  fav(articlId: string, userId: string): Observable<any> {
    return this.apiService.post(`/api/posts/${articlId}/fav`, { userId }).pipe(
      tap((lovedPost) => {
        this.lovedPosts$.value.push(lovedPost);
        this.socketService.socket.emit('newLike', {
          userId,
          articleId: articlId,
        });
      })
    );
  }
  unfav(articlId: string, userId: string): Observable<any> {
    return this.apiService
      .post(`/api/posts/${articlId}/unfav`, { userId })
      .pipe(
        tap((unlovedPost) => {
          let updatedItems = this.lovedPosts$.value.filter(
            (item) => item.postId != unlovedPost.postId
          );
          this.lovedPosts$.next(updatedItems);
        })
      );
  }
  // put(id: string, item: any): Observable<any> {
  //   return this.apiService.put(`/api/posts/${id}`, item).pipe(
  //     tap((updatedItem) => {
  //       const index = this.posts$.value.indexOf(id);
  //       this.posts$.value.splice(index, 1, updatedItem);
  //     })
  //   );
  // }
  getPostsByFollowing(userId: string): Observable<any[]> {
    return this.apiService
      .post(`/api/posts/following?page=${0}&size=${5}`, { userId })
      .pipe(
        tap((response) => {
          const { rows: posts, totalPages, currentPage } = response;
          this.posts$.next(posts);
          this.totalPages = totalPages;
          this.currentPage = currentPage;
        })
      );
  }
  getPostsByTags(tags: any[]): Observable<any[]> {
    return this.apiService.post(`/api/posts/by-tag`, { tags }).pipe(
      tap((response) => {
        this.posts$.next(response);
      })
    );
  }
  getPostsByUseId(userId: any): Observable<any[]> {
    return this.apiService.get(`/api/posts/by-user/${userId}`).pipe(
      tap((response) => {
        this.posts$.next(response);
      })
    );
  }
  searchPosts(query: string): Observable<any[]> {
    return this.apiService.get(`/api/posts/search?t=${query}`).pipe(
      tap((response) => {
        // this.posts$.next(response);
      })
    );
  }
}
