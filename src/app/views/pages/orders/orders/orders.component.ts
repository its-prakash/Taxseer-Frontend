import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OrderService, OrderEntity, OrderFormEntity } from '../order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  orders: OrderEntity[] = [];
  visibleOrders: any[] = [];
  orderFormsCache = new Map<string, OrderFormEntity[]>();
  
  isLoading = false;
  errorMsg = '';
  toastMsg = '';

  searchQuery = '';
  selectedFiler = 'all';
  selectedYear = 'all';
  selectedStatus = 'all';

  visibleOrderCount = 0;
  filerOptions: string[] = [];
  expandedOrders = new Set<string>();

  tileData: any[] = [];

  statusMap: Record<string, { label: string; pillClass: string }> = {
    'accepted': { label: 'Accepted', pillClass: 'p-ok' },
    'in_process': { label: 'In process', pillClass: 'p-info' },
    'rejected': { label: 'Rejected', pillClass: 'p-err' }
  };

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.errorMsg = '';
    this.orderService.getOrders(this.selectedFiler, this.selectedYear, this.selectedStatus).subscribe({
      next: (data) => {
        this.orders = data;
        this.filerOptions = Array.from(new Set(data.map(o => o.filer)));
        this.isLoading = false;
        this.processData();
      },
      error: (err) => {
        console.error('Failed to load orders', err);
        this.errorMsg = 'Failed to load orders from the server.';
        this.isLoading = false;
      }
    });
  }

  processData(): void {
    // Map backend entities to view objects expected by HTML template
    let mapped = this.orders.map(o => {
      let normStatus = 'accepted';
      if (o.status.toLowerCase().includes('process')) normStatus = 'in_process';
      else if (o.rejections > 0 || o.status.toLowerCase().includes('reject')) normStatus = 'rejected';

      let filesState = 'none';
      if (o.filesStatus.toLowerCase().includes('download')) filesState = 'ready';
      else if (o.filesStatus.toLowerCase().includes('expire')) filesState = 'expired';

      return {
        id: o.id,
        no: o.orderNo,
        filerName: o.filer,
        filerId: o.id,
        placed: o.placed,
        year: o.taxYear,
        formsCount: o.forms || 0,
        amt: o.amount,
        status: normStatus,
        rejectedCount: o.rejections || 0,
        copies: o.copiesStatus,
        files: filesState,
        rawStatus: o.status
      };
    });

    // Compute tile counts
    const totalCount = this.orders.length;
    const totalAmount = this.orders.reduce((sum, o) => sum + Number(o.amount), 0);
    const inProcessCount = this.orders.filter(o => o.status.toLowerCase().includes('process')).length;
    const rejectedCount = this.orders.filter(o => o.rejections > 0 || o.status.toLowerCase().includes('reject')).length;
    const acceptedCount = this.orders.filter(o => o.status.toLowerCase().includes('accept') && (!o.rejections || o.rejections === 0)).length;

    this.tileData = [
      { key: 'all', label: `orders · $${totalAmount.toFixed(2)} total`, value: totalCount, cssClass: '' },
      { key: 'in_process', label: 'in process with IRS / SSA', value: inProcessCount, cssClass: '' },
      { key: 'rejected', label: 'with rejected forms', value: rejectedCount, cssClass: 'err' },
      { key: 'accepted', label: 'fully accepted', value: acceptedCount, cssClass: '' }
    ];

    // Apply search and status filters
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      mapped = mapped.filter(o => o.no.toLowerCase().includes(q) || o.filerName.toLowerCase().includes(q));
    }

    if (this.selectedStatus !== 'all') {
      mapped = mapped.filter(o => o.status === this.selectedStatus);
    }

    this.visibleOrders = mapped;
    this.visibleOrderCount = mapped.length;
  }

  toggleOrder(orderNo: string): void {
    if (this.expandedOrders.has(orderNo)) {
      this.expandedOrders.delete(orderNo);
    } else {
      this.expandedOrders.add(orderNo);
      const targetOrder = this.orders.find(o => o.orderNo === orderNo);
      if (targetOrder && !this.orderFormsCache.has(orderNo)) {
        this.orderService.getOrderForms(targetOrder.id).subscribe({
          next: (forms) => {
            this.orderFormsCache.set(orderNo, forms);
          },
          error: (err) => console.error('Failed to load order sub-forms', err)
        });
      }
    }
  }

  getFormRows(orderNo: string): any[] {
    const cached = this.orderFormsCache.get(orderNo) || [];
    return cached.map(f => ({
      form: f.formType,
      recipientName: f.recipientName,
      tin: f.tin,
      box1Amount: f.box1Amount,
      status: f.status,
      rejectionReason: f.issueDesc
    }));
  }

  getOrderFormCount(o: any): number {
    return o.formsCount;
  }

  formLabels(o: any): string {
    return 'W-2 / 1099';
  }

  money(val: number): string {
    return Number(val).toFixed(2);
  }

  formRowPillClass(row: any): string {
    return row.status === 'Rejected' ? 'p-err' : 'p-ok';
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedFiler = 'all';
    this.selectedYear = 'all';
    this.selectedStatus = 'all';
    this.processData();
  }

  showToast(msg: string): void {
    this.toastMsg = msg;
    setTimeout(() => {
      if (this.toastMsg === msg) this.toastMsg = '';
    }, 3000);
  }
}