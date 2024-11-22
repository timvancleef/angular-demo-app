import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QueryResult } from '../../../types';
import { Post } from '../../types';
import { PostsFacade } from '../../posts.facade';
import { loadingResult } from '../../../core/result.utils';
import { QueryResultComponent } from '../../../shared/query-result/query-result.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [JsonPipe, RouterLink, QueryResultComponent, FormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  protected postsResult: QueryResult<Post[]>;
  protected filter = '';

  constructor(postsFacade: PostsFacade) {
    this.postsResult = loadingResult<Post[]>();

    postsFacade.fetchPosts().then((result) => {
      this.postsResult = result;
    });
  }

  applyFilter(posts?: Post[]) {
    return posts?.filter((post) => {
      return post.title.includes(this.filter);
    });
  }
}
