import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';

import { CustomTabsComponent, TabConfig } from '../../../../shared/components/custom-tabs/custom-tabs.component';
import { CustomTableComponent, TableColumn } from '../../../../shared/components/custom-table/custom-table.component';
import { CustomPaginatorComponent } from '../../../../shared/components/custom-paginator/custom-paginator.component';

interface QuotationRow {
  id: string; // added primitive ID for trackBy
  factoryName: string;
  factoryId: string;
  productName: string;
  requester: string;
  updateDate: string;
  status: 'เสร็จสิ้น' | 'ฉบับร่าง' | 'รอพิจารณา' | 'รอแก้ไข';
}

@Component({
  selector: 'app-quotation-table',
  standalone: true,
  imports: [CommonModule, CustomTabsComponent, CustomTableComponent, CustomPaginatorComponent],
  templateUrl: './quotation-table.component.html',
  styleUrl: './quotation-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotationTableComponent {
  // Tabs
  selectedTabIndex = 0;
  tabs: TabConfig[] = [
    { key: 'all', label: 'ทั้งหมด', count: 1029, iconType: 'all' },
    { key: 'draft', label: 'แบบร่าง', count: 4, iconType: 'draft' },
    { key: 'revising', label: 'รอแก้ไข', count: 15, iconType: 'edit' },
    { key: 'pending', label: 'รอพิจารณา', count: 15, iconType: 'pending' },
    { key: 'completed', label: 'เสร็จสิ้น', count: 980, iconType: 'completed' }
  ];

  // Table
  tableColumns: TableColumn[] = [
    { key: 'checkbox', label: '', width: '5%', type: 'checkbox' },
    { key: 'factoryName', label: 'ชื่อโรงงาน/เลขรับแบบ', width: '25%', type: 'factory' },
    { key: 'productName', label: 'ชื่อสินค้า', width: '25%', type: 'text' },
    { key: 'requester', label: 'ผู้รับแบบแจ้ง', width: '15%', type: 'text' },
    { key: 'updateDate', label: 'วันที่อัปเดตล่าสุด', width: '15%', type: 'text' },
    { key: 'status', label: 'สถานะ', width: '10%', type: 'badge' },
    { key: 'actions', label: '', width: '5%', type: 'actions' }
  ];

  tableData: QuotationRow[] = [
    {
      id: '1',
      factoryName: 'โรงงานน้ำดื่มABC',
      factoryId: '18989.7',
      productName: 'น้ำดื่มสดชื่น 200 มิลลิลิตร',
      requester: 'สุภัทรา จิตใจดี',
      updateDate: '4/08/2025 18:00',
      status: 'เสร็จสิ้น'
    },
    {
      id: '2',
      factoryName: 'โรงงานน้ำดื่มABC',
      factoryId: '18989.7',
      productName: 'น้ำดื่มสดชื่น 200 มิลลิลิตร',
      requester: 'สุภัทรา จิตใจดี',
      updateDate: '4/08/2025 18:00',
      status: 'เสร็จสิ้น'
    },
    {
      id: '3',
      factoryName: 'โรงงานน้ำดื่มABC',
      factoryId: '6800001767',
      productName: 'น้ำดื่มสดชื่น 200 มิลลิลิตร',
      requester: 'สุภัทรา จิตใจดี',
      updateDate: '4/08/2025 18:00',
      status: 'เสร็จสิ้น'
    },
    {
      id: '4',
      factoryName: 'โรงงานน้ำดื่มABC',
      factoryId: '18989.7',
      productName: 'น้ำดื่มสดชื่น 200 มิลลิลิตร',
      requester: 'สุภัทรา จิตใจดี',
      updateDate: '4/08/2025 18:00',
      status: 'เสร็จสิ้น'
    },
    {
      id: '5',
      factoryName: 'โรงงานน้ำดื่มABC',
      factoryId: '6800001762',
      productName: 'น้ำดื่มสดชื่น 200 มิลลิลิตร',
      requester: 'สุภัทรา จิตใจดี',
      updateDate: '4/08/2025 18:00',
      status: 'ฉบับร่าง'
    },
    {
      id: '6',
      factoryName: 'โรงงานน้ำดื่มABC',
      factoryId: '6800001794',
      productName: 'น้ำดื่มสดชื่น 200 มิลลิลิตร',
      requester: 'สุภัทรา จิตใจดี',
      updateDate: '4/08/2025 18:00',
      status: 'เสร็จสิ้น'
    }
  ];

  // Paginator
  pageLength = 1029;
  pageSize = 10;
  pageIndex = 0;

  onTabChanged(index: number) {
    this.selectedTabIndex = index;
    // Mock logic changing
  }

  onPageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
