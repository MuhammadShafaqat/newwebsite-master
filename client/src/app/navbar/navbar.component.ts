import { Component, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

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
  userName: string | null = null;
  cartCount = 0;

  constructor(private router: Router, private auth: AuthService, private cartService:CartService) {}

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

    // ✅ Prefer loading username directly from localStorage if available
    this.userName = localStorage.getItem('username');

    // ✅ Optional: fetch from server if token exists and user not yet set
    if (!this.userName && this.auth.isLoggedIn()) {
      this.auth.getCurrentUser().subscribe({
        next: (res: any) => {
          // Update userName
          this.userName = res.user?.username;
          // Optionally store in localStorage for later reuse
          localStorage.setItem('username', this.userName || '');
        },
        error: () => {
          this.userName = null;
        }
      });
    }
  
  
   // ✅ Subscribe to cart item count
  this.cartService.cart$.subscribe(items => {
    this.cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  })
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
