import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent:() => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'login',
        loadComponent:() => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'dashboard',
        loadComponent:() => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
        
];
