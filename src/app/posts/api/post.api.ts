import { Injectable } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';
import { Post } from '../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostApi {
  private posts: Post[] = [];
  constructor(private httpClient: HttpClient) {}

  public fetchPosts(): Promise<Post[]> {
    if (this.posts.length > 1) {
      return Promise.resolve(this.posts);
    }

    return firstValueFrom(
      this.httpClient
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
        .pipe(tap((posts) => (this.posts = posts))),
    );
  }

  public async fetchPost(id: number): Promise<Post | undefined> {
    const posts = await this.fetchPosts();
    return posts.find((p) => p.id === id);
  }
}
