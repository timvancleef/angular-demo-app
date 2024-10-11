import { Injectable, Signal } from '@angular/core';
import { ReadingListStore } from '../core/reading-list.store';
import { Post } from '../posts/types';

@Injectable({
  providedIn: 'root',
})
export class ReadingListFacade {
  constructor(private readingListStore: ReadingListStore) {}

  public get readingList(): Signal<Post[]> {
    return this.readingListStore.readingList;
  }

  public removePost(postId: number) {
    this.readingListStore.removePost(postId);
  }
}
