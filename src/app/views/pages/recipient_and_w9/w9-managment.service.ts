import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipientEntity } from './w9-managment/w9-managment.component';

@Injectable({
  providedIn: 'root'
})
export class W9ManagmentService {
  private baseUrl = 'http://localhost:8080/api/recipients';
  private http = inject(HttpClient);

  getRecipients(filer?: string, status?: string): Observable<RecipientEntity[]> {
    let params = new HttpParams();
    if (filer) params = params.set('filer', filer);
    if (status) params = params.set('status', status);
    return this.http.get<RecipientEntity[]>(`${this.baseUrl}`, { params });
  }

  createRecipient(recipient: RecipientEntity): Observable<RecipientEntity> {
    return this.http.post<RecipientEntity>(`${this.baseUrl}`, recipient);
  }

  sendW9Request(recipientIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/w9-request`, { recipientIds });
  }
}