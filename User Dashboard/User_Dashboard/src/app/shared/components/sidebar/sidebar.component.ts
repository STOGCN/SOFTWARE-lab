import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, MatRippleModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  productMenu = [
    { label: 'ข้อมูลรายการสินค้า', link: '/product-items' },
    { label: 'ข้อมูลประเภทสินค้า', link: '/product-types' },
    { label: 'ข้อมูลผู้ขายสินค้า', link: '/vendors' },
    { label: 'แจ้งผลิตภัณฑ์ใหม่', link: '/new-product' },
    { label: 'แจ้งวัตถุดิบใหม่', link: '/new-material' }
  ];

  systemMenu = [
    { label: 'คู่มือผู้ใช้', link: '/manual' },
    { label: 'ช่องทางติดต่อ', link: '/contact' },
    { label: 'ข้อมูลอ้างอิง', link: '/reference' },
    { label: 'ดาวน์โหลด โปรแกรมบาร์โค้ด', link: '/download-barcode' },
    { label: 'รายงาน', link: '/reports' },
    { label: 'สิทธิการใช้งาน', link: '/permissions' }
  ];
}
