import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatRippleModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {
  statusItems = [
    { title: 'รอผู้ประกอบการตรวจสอบ', count: 3, icon: 'schedule', color: '#d97706' },
    { title: 'รอแก้ไข', count: 3, icon: 'edit', color: '#ef4444' },
    { title: 'รอพิจารณา', count: 3, icon: 'article', color: '#8b5cf6' },
    { title: 'รอแก้ไขตามกรม', count: 3, icon: 'assignment_late', color: '#ea580c' },
    { title: 'รอส่งเอกสารเพิ่ม', count: 5, icon: 'send', color: '#65a30d' },
    { title: 'รอชำระภาษี', count: 3, icon: 'payments', color: '#059669' }
  ];

  serviceItems = [
    { title: 'ยื่นแจ้งราคา', subtitle: 'ภส.02-01 / ภส.02-02', icon: 'sell' },
    { title: 'บัญชีประจำวัน', subtitle: 'ภส.07-01 / ภส.07-02', icon: 'calendar_today' },
    { title: 'งบเดือน', subtitle: 'ภส.07-03 / ภส.07-04', icon: 'calendar_month' },
    { title: 'สิทธิประโยชน์ทางภาษี', subtitle: 'ภส.05 / ภส.14 ทั้งหมด', icon: 'star' },
    { title: 'แบบชำระภาษี', subtitle: 'ภส.03-07 / ภส.03-08', icon: 'request_quote' },
    { title: 'ชำระภาษี', subtitle: 'ภส.03-07 / ภส.03-08', icon: 'payments' },
    { title: 'ยื่นจดทะเบียน', subtitle: 'ภส.01-01', icon: 'drive_file_rename_outline' },
    { title: 'ขอชำระภาษีภายในวันที่ 15', subtitle: 'ภส.03-10', icon: 'event' },
    { title: 'ขอจดเครื่องหมาย', subtitle: 'ภส.06-03', icon: 'verified' }
  ];

  newsItems = [
    { type: 'แจ้งเหตุ', title: 'แจ้งปิดปรับปรุงระบบ วันที่ 27/06/2568', desc: 'Lorem ipsum dolor sit amet, consectetur' },
    { type: 'ระบบงาน', title: 'ระบบงานแจ้งราคาขายปลีกแนะนำสำหรับสินค้าประเภทที่ 09.01 น้ำหอม หัวน้ำหอม และน้ำมันหอม', desc: 'Lorem ipsum dolor sit amet, consectetur' },
    { type: 'แจ้งเหตุ', title: 'แจ้งปิดปรับปรุงระบบ วันที่ 27/06/2568', desc: 'Lorem ipsum dolor sit amet, consectetur' }
  ];
}
