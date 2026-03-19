import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './custom-paginator-intl';

@Component({
  selector: 'app-custom-paginator',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './custom-paginator.component.html',
  styleUrl: './custom-paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
  encapsulation: ViewEncapsulation.None
})
export class CustomPaginatorComponent {
  @Input() length: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];
  
  @Output() pageInfoChanged = new EventEmitter<PageEvent>();

  onPageChange(event: PageEvent) {
    this.pageInfoChanged.emit(event);
  }
}
