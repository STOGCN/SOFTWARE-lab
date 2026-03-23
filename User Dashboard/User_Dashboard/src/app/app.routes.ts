import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './pages/dashboard/dashboard-home/dashboard-home.component';

export const routes: Routes = [
  { path: '', component: DashboardHomeComponent },
  { path: '**', redirectTo: '' }
];
