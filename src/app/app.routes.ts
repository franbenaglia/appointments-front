import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
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
    path: 'success_oauth2',
    loadComponent: () => import('./success-oauth2/success-oauth2.component').then(m => m.SuccessOauth2Component)
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
