// src/app/admin-services/adminpress.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PressRelease } from '../../_models/press';

@Injectable({
  providedIn: 'root'
})
export class AdminpressService {
  private baseUrl = 'http://localhost:5000/api/press-release';

  constructor(private http: HttpClient) {}

  getAllReleases(): Observable<PressRelease[]> {
    return this.http.get<PressRelease[]>(this.baseUrl);
  }

  createRelease(data: { title: string; content: string }): Observable<PressRelease> {
    return this.http.post<PressRelease>(this.baseUrl, data);
  }

  sendRelease(id: string, payload: { email: string; pdfBase64: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/send/${id}`, payload);
  }
}
