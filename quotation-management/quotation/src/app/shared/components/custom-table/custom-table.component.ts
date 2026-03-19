import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  type?: 'text' | 'badge' | 'factory' | 'actions';
}

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomTableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];

  get displayedColumns(): string[] {
    return this.columns.map(c => c.key);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index; // Default tracking
  }
}
