import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isExpanded = true;
  activeItem = 3; // Setting the 4th item (index 3) as active by default based on the design

  menuItems = [
    { icon: 'home', type: 'home', path: '/' },
    { icon: 'document', type: 'doc', path: '/doc1' },
    { icon: 'document', type: 'doc', path: '/doc2' },
    { icon: 'document', type: 'doc', path: '/quotation' },
    { icon: 'document', type: 'doc', path: '/doc4' },
    { icon: 'document', type: 'doc', path: '/doc5' },
    { icon: 'document', type: 'doc', path: '/doc6' },
    { icon: 'document', type: 'doc', path: '/doc7' },
    { icon: 'document', type: 'doc', path: '/doc8' },
    { icon: 'document', type: 'doc', path: '/doc9' },
    { icon: 'document', type: 'doc', path: '/doc10' }
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  setActive(index: number) {
    this.activeItem = index;
    const path = this.menuItems[index].path;
    if (path) {
      this.router.navigate([path]);
    }
  }
}
