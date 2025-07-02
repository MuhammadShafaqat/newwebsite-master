import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  webseitenTitel: string = 'Büezer und KMU Partei (BKP)';
  isMenuOpen = false;
  isMobileView = false;
  previousScrollY = 0;
  hideNavbar = false;
  userName: string | null = null;

  constructor(private router: Router, private auth: AuthService) {}

  @HostListener('window:resize')
  onResize() {
    this.isMobileView = window.innerWidth <= 768;
    if (!this.isMobileView) this.isMenuOpen = false;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const currentScrollY = window.scrollY;
    this.hideNavbar =
      currentScrollY > this.previousScrollY && currentScrollY > 80;
    this.previousScrollY = currentScrollY;
  }

  ngOnInit() {
    this.onResize();
    this.previousScrollY = window.scrollY;

    // Initial check
    this.loadUsername();

    // 🔁 Listen to route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadUsername();
      });
  }

  loadUsername() {
    this.userName = localStorage.getItem('username');

    if (!this.userName && this.auth.isLoggedIn()) {
      this.auth.getCurrentUser().subscribe({
        next: (res: any) => {
          this.userName = res.user?.username;
          localStorage.setItem('username', this.userName || '');
        },
        error: () => {
          this.userName = null;
        },
      });
    }
  }

  logout() {
    this.auth.logout();
    this.userName = null;
    localStorage.removeItem('username');
    this.router.navigate(['/signin']);
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
