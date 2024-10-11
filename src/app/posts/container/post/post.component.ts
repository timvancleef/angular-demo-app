import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { QueryResult } from '../../../types';
import { Post, Comment } from '../../types';
import { PostsFacade } from '../../posts.facade';
import { loadingResult } from '../../../core/result.utils';
import { QueryResultComponent } from '../../../shared/query-result/query-result.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [JsonPipe, RouterLink, QueryResultComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  protected postResult: QueryResult<Post>;
  protected commentsResult: QueryResult<Comment[]>;
  protected isPostOnReadingList: WritableSignal<boolean> = signal(false);

  constructor(
    private postsFacade: PostsFacade,
    activatedRoute: ActivatedRoute,
  ) {
    const id = activatedRoute.snapshot.data['id'];

    this.isPostOnReadingList.set(postsFacade.isPostOnReadingList(id));

    this.postResult = loadingResult<Post>();
    this.commentsResult = loadingResult<Comment[]>();

    postsFacade.fetchPost(id).then((result) => {
      this.postResult = result;
    });
    postsFacade.fetchComments(id).then((result) => {
      this.commentsResult = result;
    });
  }

  protected toggleReadingList(post: Post) {
    if (this.postsFacade.isPostOnReadingList(post.id)) {
      this.postsFacade.removePost(post);
      this.isPostOnReadingList.set(false);
    } else {
      this.postsFacade.addPost(post);
      this.isPostOnReadingList.set(true);
    }
  }
}
