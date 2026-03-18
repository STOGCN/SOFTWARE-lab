import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tab {
  id: string;
  label: string;
  count: number;
  icon?: string;
}

interface QuotationRow {
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
  imports: [CommonModule],
  templateUrl: './quotation-table.component.html',
  styleUrl: './quotation-table.component.scss'
})
export class QuotationTableComponent {
  activeTab = 'all';

  tabs: Tab[] = [
    { id: 'all', label: 'ทั้งหมด', count: 1029, icon: 'all' },
    { id: 'draft', label: 'แบบร่าง', count: 4, icon: 'draft' },
    { id: 'revising', label: 'รอแก้ไข', count: 15, icon: 'revising' },
    { id: 'pending', label: 'รอพิจารณา', count: 15, icon: 'pending' },
    { id: 'completed', label: 'เสร็จสิ้น', count: 980, icon: 'completed' }
  ];

  tableData: QuotationRow[] = [
    {
      factoryName: 'โรงงานน้ำดื่มABC',
      factoryId: '18989.7',
      productName: 'น้ำดื่มสดชื่น 200 มิลลิลิตร',
      requester: 'สุภัทรา จิตใจดี',
      updateDate: '4/08/2025 18:00',
      status: 'เสร็จสิ้น'
    },
    {
      factoryName: 'โรงงานน้ำดื่มABC',
      factoryId: '18989.7',
      productName: 'น้ำดื่มสดชื่น 200 มิลลิลิตร',
      requester: 'สุภัทรา จิตใจดี',
      updateDate: '4/08/2025 18:00',
      status: 'เสร็จสิ้น'
    },
    {
      factoryName: 'โรงงานน้ำดื่มABC',
      factoryId: '6800001767',
      productName: 'น้ำดื่มสดชื่น 200 มิลลิลิตร',
      requester: 'สุภัทรา จิตใจดี',
      updateDate: '4/08/2025 18:00',
      status: 'เสร็จสิ้น'
    },
    {
      factoryName: 'โรงงานน้ำดื่มABC',
      factoryId: '18989.7',
      productName: 'น้ำดื่มสดชื่น 200 มิลลิลิตร',
      requester: 'สุภัทรา จิตใจดี',
      updateDate: '4/08/2025 18:00',
      status: 'เสร็จสิ้น'
    },
    {
      factoryName: 'โรงงานน้ำดื่มABC',
      factoryId: '6800001762',
      productName: 'น้ำดื่มสดชื่น 200 มิลลิลิตร',
      requester: 'สุภัทรา จิตใจดี',
      updateDate: '4/08/2025 18:00',
      status: 'ฉบับร่าง'
    },
    {
      factoryName: 'โรงงานน้ำดื่มABC',
      factoryId: '6800001794',
      productName: 'น้ำดื่มสดชื่น 200 มิลลิลิตร',
      requester: 'สุภัทรา จิตใจดี',
      updateDate: '4/08/2025 18:00',
      status: 'เสร็จสิ้น'
    }
  ];

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }
}
