import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QueryResult } from '../../../types';
import { Post } from '../../types';
import { PostsFacade } from '../../posts.facade';
import { loadingResult } from '../../../core/result.utils';
import { QueryResultComponent } from '../../../shared/query-result/query-result.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [JsonPipe, RouterLink, QueryResultComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  protected postsResult: QueryResult<Post[]>;

  constructor(postsFacade: PostsFacade) {
    this.postsResult = loadingResult<Post[]>();

    postsFacade.fetchPosts().then((result) => {
      this.postsResult = result;
    });
  }
}
