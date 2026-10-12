import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type OrderStatus = 'process' | 'accepted' | 'rejected';
export type FileState = 'ready' | 'expired' | 'none';

export interface Order {
  no: string;
  filerId: number;
  filerName: string;
  placed: string;
  year: string;
  formSummary: Record<string, number>;
  amt: number;
  status: OrderStatus;
  rejectedCount: number;
  copies: string;
  files: FileState;
}

export interface OrderFormLine {
  form: string;
  recipientName: string;
  tin: string;
  box1Amount: number;
  status: 'Accepted' | 'Submitted' | 'Rejected';
  rejectionReason?: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly endpoint = '/api/orders';

  constructor(private readonly http: HttpClient) {}

  list(params: { filerId?: number; year?: string; status?: string; q?: string } = {}): Observable<Order[]> {
    let httpParams = new HttpParams();
    if (params.filerId) httpParams = httpParams.set('filerId', params.filerId);
    if (params.year && params.year !== 'all') httpParams = httpParams.set('year', params.year);
    if (params.status && params.status !== 'all') httpParams = httpParams.set('status', params.status);
    if (params.q) httpParams = httpParams.set('q', params.q);
    return this.http.get<Order[]>(this.endpoint, { params: httpParams });
  }

  getForms(orderNo: string): Observable<OrderFormLine[]> {
    return this.http.get<OrderFormLine[]>(`${this.endpoint}/${orderNo}/forms`);
  }

  downloadUrl(orderNo: string): string {
    return `${this.endpoint}/${orderNo}/download`;
  }
}