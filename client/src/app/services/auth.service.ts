import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

export interface AuthResponse {
  message: string;
  isAdmin: boolean;
  token: string;
  id: string; // ✅ Add this
  roleLevel: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private http:HttpClient) { }

  signup(data: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/signup`, data);
  }

  signin(data: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/signin`, data);
  }
 
getCurrentUser(): Observable<User> {
  const token = localStorage.getItem('token');
  return this.http.get<User>(`${this.baseUrl}/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}


isLoggedIn(): boolean {
  const token = localStorage.getItem('token');
  console.log('🧪 Checking token in localStorage:', token);
  return !!token;
}



   logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  }

}
