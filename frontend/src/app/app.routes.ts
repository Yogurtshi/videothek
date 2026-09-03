
import { Routes } from '@angular/router';
import { appCanActivate } from './guard/app.auth.guard';
import { AppRoles } from './app.roles';
import { NoAccess } from './pages/no-access/no-access';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'media'
  },
  {
    path: 'media',
    loadComponent: () => import('./pages/media-list/media-list')
        .then(c => c.MediaList),
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.Read],
      pagetitle: 'Alle Medien'
    }
  },
  {
    path: 'media/:id',
    pathMatch: 'full',
    loadComponent: () => import('./pages/media-detail/media-detail')
        .then(c => c.MediaDetail),
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.Read],
      pagetitle: 'Medium Details'
    }
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./pages/admin-dashboard/admin-dashboard')
        .then(c => c.AdminDashboard),
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.Admin],
      pagetitle: 'Admin Dashboard'
    }
  },
  {
    path: 'noaccess',
    component: NoAccess
  },
  {
    path: '**',
    redirectTo: 'media'
  }
];
