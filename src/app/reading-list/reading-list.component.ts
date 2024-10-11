import { Component, Signal } from '@angular/core';
import { ReadingListFacade } from './reading-list.facade';
import { Post } from '../posts/types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reading-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reading-list.component.html',
  styleUrl: './reading-list.component.css',
})
export class ReadingListComponent {
  protected readonly readingList: Signal<Post[]>;

  constructor(private facade: ReadingListFacade) {
    this.readingList = facade.readingList;
  }

  protected removeFromReadingList(postId: number) {
    this.facade.removePost(postId);
  }
}
