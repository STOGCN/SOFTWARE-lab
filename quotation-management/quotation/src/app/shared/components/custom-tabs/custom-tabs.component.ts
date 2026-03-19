import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

export interface TabConfig {
  key: string;
  label: string;
  count?: number;
  iconType?: 'all' | 'draft' | 'edit' | 'pending' | 'completed';
  disabled?: boolean;
}

@Component({
  selector: 'app-custom-tabs',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  templateUrl: './custom-tabs.component.html',
  styleUrl: './custom-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None // Needed to cleanly override deep mat-tab structures
})
export class CustomTabsComponent {
  @Input() tabs: TabConfig[] = [];
  @Input() selectedIndex: number = 0;
  @Output() selectedIndexChange = new EventEmitter<number>();

  onTabChange(index: number) {
    this.selectedIndexChange.emit(index);
  }
}
