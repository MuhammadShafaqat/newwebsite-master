import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminuserService {
private apiUrl = 'http://localhost:5000/api/auth/users';
  constructor(private http: HttpClient) { }
getAllUsers(): Observable<any[]> {
  const token = localStorage.getItem('token');
    return this.http.get<any[]>(this.apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  }

  updateUser(userId: string, update: any): Observable<any> {
     const token = localStorage.getItem('token');
    return this.http.patch(`${this.apiUrl}/${userId}`, update, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  }

   /**
   * Create or update the registration key (4-digit code)
   */
  createOrUpdateRegistrationKey(key: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/registration-key`, { key }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  /* get key */
  getKeyInfo(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(`${this.apiUrl}/registration-key`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}


}
