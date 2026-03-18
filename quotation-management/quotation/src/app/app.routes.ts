import { Routes } from '@angular/router';
import { QuotationPageComponent } from './features/quotation/pages/quotation-page/quotation-page.component';

export const routes: Routes = [
  { path: 'quotation', component: QuotationPageComponent },
  { path: '', redirectTo: '/quotation', pathMatch: 'full' }
];
