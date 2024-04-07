import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/turns-list',
    loadComponent: () => import('./turns-list/turns-list.page').then(m => m.TurnsListPage)
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'turn-detail/:_id',
    loadComponent: () =>
      import('./turn-detail/turn-detail.page').then(m => m.TurnDetailPage)
  },

];
