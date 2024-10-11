import { Component, computed, effect, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ReadingListStore } from './core/reading-list.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-demo-app';
  protected count: Signal<number>;

  constructor(readingListStore: ReadingListStore) {
    this.count = readingListStore.readingListCount
  }
}
