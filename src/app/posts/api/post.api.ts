import { Injectable } from '@angular/core';
import { delay, firstValueFrom, of } from 'rxjs';
import { Post } from '../types';
import posts from '../../fixtures/posts.fixture';
import { randomNumber } from '../../core/math.utils';

@Injectable({
  providedIn: 'root',
})
export class PostApi {
  public fetchPosts(): Promise<Post[]> {
    return firstValueFrom(of(posts).pipe(delay(randomNumber())));
  }

  public fetchPost(id: number): Promise<Post | undefined> {
    return firstValueFrom(
      of(posts.find((post) => post.id === id)).pipe(delay(randomNumber())),
    );
  }
}
