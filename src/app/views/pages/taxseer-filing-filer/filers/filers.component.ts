import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilerRecipientComponent } from '../filer-recipient/filer-recipient.component';
import { FilerFilingsComponent } from '../filer-filings/filer-filings.component';
import { FilerDownloadComponent } from '../filer-download/filer-download.component';
import { FilerFormStatusComponent } from '../filer-form-status/filer-form-status.component';
import { FilerOrdersComponent } from '../filer-orders/filer-orders.component';
import { FilerSummaryComponent } from '../filer-summary/filer-summary.component';
export interface FilerInfo {
  legalName: string;
  filerName2: string;
  addressLine: string;
  addressMultiline: string;
  country: string;
  phone: string;
  tinType: string;
  ein: string;
  tinMasking: string;
  contactEmail: string;
  payerStateId: string;
  formsFiledBefore: string[];
}

@Component({
  selector: 'app-filers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    FilerRecipientComponent, 
    FilerFilingsComponent,
    FilerFormStatusComponent,
    FilerDownloadComponent,
    FilerOrdersComponent,
    FilerSummaryComponent
  ],
  templateUrl: './filers.component.html',
  styleUrl: './filers.component.scss'
})
export class FilersComponent {
 
  activeTab: string = 'Filer';

  tabs = [
    { id: 'Filer', label: 'Filer', badge: null },
    { id: 'Recipients', label: 'Recipients', badge: 6 },
    { id: 'Filings', label: 'Filings', badge: 3 },
    { id: 'Orders', label: 'Orders', badge: 2 },
    { id: 'Forms status', label: 'Forms status', badge: null },
    { id: 'Downloads', label: 'Downloads', badge: 2 },
    { id: 'Summary', label: 'Summary', badge: null }
  ];

  // Filer Details Data
  filerDetails: FilerInfo = {
    legalName: 'Tech International Corporation',
    filerName2: 'Not set',
    addressLine: '200 Trafalgar Square, Gaithersburg, MD 20878',
    addressMultiline: '200 Trafalgar Square\nGaithersburg, MD 20878',
    country: 'United States',
    phone: 'Not set',
    tinType: 'EIN',
    ein: '11-1111111',
    tinMasking: 'Yes',
    contactEmail: 'tac_manoj@yahoo.com',
    payerStateId: 'MD 11111111',
    formsFiledBefore: ['1099-NEC', '1099-MISC']
  };

  // Metrics Data
  metrics = {
    recipientsCount: 6,
    w9Waiting: 1,
    pendingForms: 1,
    cartItems: 3,
    acceptedCount: 29,
    acceptedYear: 2025
  };

  constructor() { }

  ngOnInit(): void { }

  selectTab(tabId: string): void {
    this.activeTab = tabId;
  }

  onPreviousFiler(): void {
    console.log('Navigate to previous filer');
  }

  onNextFiler(): void {
    console.log('Navigate to next filer');
  }

}