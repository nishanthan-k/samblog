import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/posts/posts.component').then((m) => m.PostsComponent)
  },
  {
    path: 'own',
    loadComponent: () => import('./pages/own/own.component').then((m) => m.OwnComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./pages/new-post/new-post.component').then((m) => m.NewPostComponent)
  }
];
