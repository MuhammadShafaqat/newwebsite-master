import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.getCurrentUser().pipe(
      map((user) => {
        if (user.isAdmin) {
          return true;
        } else {
          alert('Access denied. Admins only.');
          return this.router.createUrlTree(['/']);
        }
      }),
      catchError(() => {
        // If there's an error (like invalid token), redirect to home
        alert('Access denied. Please login again.');
        return of(this.router.createUrlTree(['/']));
      })
    );
  }
}