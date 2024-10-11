import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { Post } from '../posts/types';

@Injectable({ providedIn: 'root' })
export class ReadingListStore {
  private _posts: WritableSignal<Post[]> = signal([]);

  public get readingList() {
    return computed(() => this._posts());
  }

  public get readingListCount() {
    return computed(() => this._posts().length);
  }

  public addPost(post: Post) {
    this._posts.update((current) => {
      const alreadyAdded = Boolean(current.find((p) => p.id === post.id));
      if (!alreadyAdded) {
        return [...current, post];
      }
      return current;
    });
  }

  public removePost(postId: number) {
    this._posts.update((current) => {
      return current.filter((p) => p.id !== postId);
    });
  }
}
