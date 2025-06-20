import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface AuthResponse {
  message: string;
  isAdmin: boolean; // ✅ Instead of role: 'admin' | 'user'
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

}
