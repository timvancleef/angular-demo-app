import { Injectable } from '@angular/core';
import type { Comment } from '../types';
import { firstValueFrom, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CommentApi {
  private comments: Comment[] = [];

  constructor(private httpClient: HttpClient) {}

  fetchComments(postId: number): Promise<Comment[]> {
    if (this.comments.length > 1) {
      return Promise.resolve(this._filterComments(postId, this.comments));
    }

    return firstValueFrom(
      this.httpClient
        .get<Comment[]>('https://jsonplaceholder.typicode.com/comments')
        .pipe(
          tap((comments) => (this.comments = comments)),
          map((comments) => this._filterComments(postId, comments)),
        ),
    );
  }

  _filterComments(postId: number, comments: Comment[]): Comment[] {
    return comments.filter((c) => c.postId === postId);
  }
}
