import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  Router,
  Routes,
} from '@angular/router';

export const routes: Routes = [
  {
    path: 'posts',
    loadComponent: () =>
      import('./posts/container/posts/posts.component').then(
        (m) => m.PostsComponent,
      ),
  },
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./posts/container/post/post.component').then(
        (m) => m.PostComponent,
      ),
    resolve: {
      id: (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
        const router = inject(Router);

        const id = Number(activatedRouteSnapshot.paramMap.get('id'));
        const postsPath = router.parseUrl('/posts');

        if (Number.isNaN(id)) {
          return new RedirectCommand(postsPath);
        }

        return id;
      },
    },
  },
  {
    path: 'reading-list',
    loadComponent: () =>
      import('./reading-list/reading-list.component').then(
        (m) => m.ReadingListComponent,
      ),
  },
];
