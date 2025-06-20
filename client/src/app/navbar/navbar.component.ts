import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
 webseitenTitel: string = 'Büezer und KMU Partei (BKP)';
  isMenuOpen = false;
  isMobileView = false;
  previousScrollY = 0;
  hideNavbar = false;

  @HostListener('window:resize')
  onResize() {
    this.isMobileView = window.innerWidth <= 768;
    if (!this.isMobileView) this.isMenuOpen = false;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const currentScrollY = window.scrollY;
    this.hideNavbar = currentScrollY > this.previousScrollY && currentScrollY > 80;
    this.previousScrollY = currentScrollY;
  }

  ngOnInit() {
     this.onResize();
    this.previousScrollY = window.scrollY;
  }

  toggleMenu() {
    if (this.isMobileView) {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
}