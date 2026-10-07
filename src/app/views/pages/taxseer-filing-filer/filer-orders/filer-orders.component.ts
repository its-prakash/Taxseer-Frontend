import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddRecipientDrawerComponent } from '../add-recipient-drawer/add-recipient-drawer.component';

export interface OrderItem {
  id: string;
  orderNumber: string;
  placedDate: string;
  taxYear: string;
  formsCount: number;
  amount: number;
  status: 'Accepted' | 'Pending' | 'Rejected';
  recipientCopies: string;
  isExpanded?: boolean;
}

@Component({
  selector: 'app-filer-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf, AddRecipientDrawerComponent],
  templateUrl: './filer-orders.component.html',
  styleUrl: './filer-orders.component.scss'
})
export class FilerOrdersComponent {

  orders: OrderItem[] = [
    {
      id: '1',
      orderNumber: 'TS-24811',
      placedDate: 'Jan 8, 2026',
      taxYear: '2025',
      formsCount: 29,
      amount: 58.00,
      status: 'Accepted',
      recipientCopies: '29 emailed',
      isExpanded: false
    },
    {
      id: '2',
      orderNumber: 'TS-23102',
      placedDate: 'Jan 27, 2025',
      taxYear: '2024',
      formsCount: 25,
      amount: 50.00,
      status: 'Accepted',
      recipientCopies: '21 emailed, 4 mailed',
      isExpanded: false
    }
  ];

  toggleExpand(order: OrderItem): void {
    order.isExpanded = !order.isExpanded;
  }

  downloadForms(order: OrderItem): void {
    console.log(`Downloading forms for order: ${order.orderNumber}`);
  }

  exportOrders(): void {
    console.log('Orders exported');
  }

}
