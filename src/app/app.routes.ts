import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    'path': '',
    'loadComponent': () => import('./features/portfolio/portfolio')
  },
  {
    'path': '**',
    loadComponent: () => import('./features/error404-page/error404-page')
  }
];
