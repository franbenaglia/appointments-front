import { Routes } from '@angular/router';

export const routes: Routes = [
  //{
  //  path: '',
  //  redirectTo: 'folder/inbox',
  //  pathMatch: 'full',
  //},
  {
    path: 'folder/select-event',
    loadComponent: () => import('./select-event/select-event.page').then( m => m.SelectEventPage)
  },
  {
    path: 'folder/turn-range-list',
    loadComponent: () => import('./turn-range-list/turn-range-list.page').then( m => m.TurnRangeListPage)
  },
  {
    path: 'folder/turns-edit',
    loadComponent: () => import('./turn-edit/turn-edit.page').then(m => m.TurnEditPage)
  },
  {
    path: 'folder/turns-list',
    loadComponent: () => import('./turns-list/turns-list.page').then(m => m.TurnsListPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'folder/register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'folder/logout',
    loadComponent: () => import('./logout/logout.page').then( m => m.LogoutPage)
  },
  {
    path: 'folder/turn-range/:_id',
    loadComponent: () => import('./turn-range/turn-range.page').then( m => m.TurnRangePage)
  },
  {
    path: 'folder/turn-range',
    loadComponent: () => import('./turn-range/turn-range.page').then( m => m.TurnRangePage)
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
