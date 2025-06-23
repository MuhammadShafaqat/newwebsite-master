// sidebar.component.ts
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() itemSelected = new EventEmitter<string>();

  menuItems = [
    { label: 'Articles', icon: 'article', key: 'admin-articles' },
    { label: 'Inforbanner', icon: 'campaign', key: 'admin-infobanner' },
    { label: 'Events', icon: 'event', key: 'admin-events' },
    { label: 'Videos', icon: 'video_library', key: 'admin-videos' },
    { label: 'Press', icon: 'description', key: 'admin-press' },
    { label: 'Shop', icon: 'storefront', key: 'admin-shop' },
    { label: 'Logout', icon: 'logout', key: 'logout', danger: true }
  ];

  activeItem = 'dashboard';
  sidebarCollapsed = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.sidebarCollapsed = result.matches;
      });
  }

  selectItem(key: string) {
    this.activeItem = key;
    this.itemSelected.emit(key);
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
