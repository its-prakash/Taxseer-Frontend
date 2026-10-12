import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface OrderEntity {
  id: number;
  orderNo: string;
  filer: string;
  placed: string;
  taxYear: string;
  amount: number;
  status: string;
  rejections: number;
  copiesStatus: string;
  filesStatus: string;
  forms: number;
}

export interface OrderFormEntity {
  id: number;
  orderId: number;
  formType: string;
  recipientName: string;
  tin: string;
  box1Amount: number;
  status: string;
  issueDesc?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/api/orders';
  private http = inject(HttpClient);

  getOrders(filer?: string, year?: string, status?: string): Observable<OrderEntity[]> {
    let params = new HttpParams();
    if (filer && filer !== 'all') params = params.set('filer', filer);
    if (year && year !== 'all') params = params.set('year', year);
    if (status && status !== 'all') params = params.set('status', status);
    return this.http.get<OrderEntity[]>(this.baseUrl, { params });
  }

  getOrderForms(orderId: number): Observable<OrderFormEntity[]> {
    return this.http.get<OrderFormEntity[]>(`${this.baseUrl}/${orderId}/forms`);
  }

  
}