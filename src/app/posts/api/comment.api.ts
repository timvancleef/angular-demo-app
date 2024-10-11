import { Injectable } from '@angular/core';
import type { Comment } from '../types';
import comments from '../../fixtures/comments.fixture';
import { delay, firstValueFrom, of } from 'rxjs';
import { randomNumber } from '../../core/math.utils';

@Injectable({ providedIn: 'root' })
export class CommentApi {
  async fetchComments(postId: number): Promise<Comment[]> {
    return firstValueFrom(
      of(comments.filter((comment) => comment.postId === postId)).pipe(
        delay(randomNumber()),
      ),
    );
  }
}
