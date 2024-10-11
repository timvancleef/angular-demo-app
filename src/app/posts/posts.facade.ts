import { Injectable, Signal } from '@angular/core';
import { Post, Comment } from './types';
import { QueryResult } from '../types';
import { PostApi } from './api/post.api';
import { errorResult, successResult } from '../core/result.utils';
import { CommentApi } from './api/comment.api';
import { ReadingListStore } from '../core/reading-list.store';

@Injectable({
  providedIn: 'root',
})
export class PostsFacade {
  constructor(
    private postsApi: PostApi,
    private commentApi: CommentApi,
    private readingListStore: ReadingListStore,
  ) {}

  async fetchPosts(): Promise<QueryResult<Post[]>> {
    try {
      const posts = await this.postsApi.fetchPosts();
      return successResult(posts);
    } catch (error: any) {
      return errorResult(error.message);
    }
  }

  async fetchPost(id: number): Promise<QueryResult<Post>> {
    try {
      const post = await this.postsApi.fetchPost(id);
      if (post) {
        return successResult(post);
      }
      return errorResult(`post for id ${id} not found`);
    } catch (error: any) {
      return errorResult(error.message);
    }
  }

  async fetchComments(postId: number): Promise<QueryResult<Comment[]>> {
    try {
      const comments = await this.commentApi.fetchComments(postId);
      return successResult(comments);
    } catch (error: any) {
      return errorResult(error.message);
    }
  }

  public get readingList(): Signal<Post[]> {
    return this.readingListStore.readingList;
  }

  public addPost(post: Post) {
    this.readingListStore.addPost(post);
  }

  public removePost(post: Post) {
    this.readingListStore.removePost(post.id);
  }

  public isPostOnReadingList(postId: number) {
    return Boolean(
      this.readingListStore.readingList().find((p) => p.id === postId),
    );
  }
}
