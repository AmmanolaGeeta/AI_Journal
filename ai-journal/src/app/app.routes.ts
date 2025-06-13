import { Routes } from '@angular/router';

// export const routes: Routes = [
//   {
//     path: 'home',
//     loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
//   },
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full',
//   },
//   {
//     path: 'journal',
//     loadComponent: () => import('./journal/journal.page').then( m => m.JournalPage)
//   },
//   {
//     path: 'analytics',
//     loadComponent: () => import('./analytics/analytics.page').then( m => m.AnalyticsPage)
//   },
// ];
export const routes: Routes = [
  { path: '', redirectTo: 'journal', pathMatch: 'full' },
  { path: 'journal', loadComponent: () => import('./journal/journal.page').then(m => m.JournalPage) },
  { path: 'analytics', loadComponent: () => import('./analytics/analytics.page').then(m => m.AnalyticsPage) }
];