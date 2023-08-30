import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        title: 'Home | Lazpe Editorial',
        path: '',
        loadComponent: () => import('./pages/home/home.component')
    },
    {
        path: '**',
        redirectTo: ''
    }
];
