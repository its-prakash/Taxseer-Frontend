import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// src/app/services/dashboard.service.ts

export interface Filer {
  // Primary Identifiers
  id: number;
  name: string;
  ein: string;

  // Granular Address Fields (Optional for UI flexibility, populated from API)
  addr?: string;
  addr2?: string;
  city?: string;
  st?: string;
  zip?: string;
  address?: string; // Pre-formatted full address string (e.g., "123 Main St, City, ST 12345")

  // Contact Details
  phone?: string;
  email?: string;
  stateNo?: string;
  date?: string;

  // UI-specific properties
  note?: string;      // UI warnings/notes (e.g., "ZIP code mismatch")
  isRecent?: boolean;  // Tab/grouping flag (Recently worked on vs All filers)

  // Filing Metrics / Status
  formsUsed?: string;
  pending?: number;
  filed2025?: number;
  w9Received?: string;
  w9Waiting?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8080/api/filers';

  constructor() { }

  private http = inject(HttpClient)

  getFilers(): Observable<Filer[]> {
    return this.http.get<Filer[]>(this.apiUrl);
  }

  updateFiler(id: number, filerData: Filer): Observable<Filer> {
    return this.http.put<Filer>(`${this.apiUrl}/${id}`, filerData);
  }
  createFiler(filer: Filer): Observable<Filer> {
    return this.http.post<Filer>(`${this.apiUrl}`, filer);
  }

}
