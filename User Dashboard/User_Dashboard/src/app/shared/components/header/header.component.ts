import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuItems = [
    { label: 'หน้าหลัก', link: '/' },
    { label: 'จดทะเบียน', link: '/registration' },
    { label: 'แจ้งราคาขายปลีก', link: '/retail-price' },
    { label: 'งบเดือน', link: '/monthly-statement' },
    { label: 'สิทธิประโยชน์', link: '/privileges' },
    { label: 'ชำระภาษี', link: '/tax-payment' },
    { label: 'ติดตามสถานะ', link: '/track-status' },
    { label: 'ดูบริการทั้งหมด', link: '/all-services' },
  ];
}
