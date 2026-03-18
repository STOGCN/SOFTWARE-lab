import { Component } from '@angular/core';
import { QuotationTableComponent } from '../../components/quotation-table/quotation-table.component';

@Component({
  selector: 'app-quotation-page',
  standalone: true,
  imports: [QuotationTableComponent],
  templateUrl: './quotation-page.component.html',
  styleUrl: './quotation-page.component.scss'
})
export class QuotationPageComponent {

}
