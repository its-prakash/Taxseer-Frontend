import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddRecipientDrawerComponent, RecipientFormData } from '../add-recipient-drawer/add-recipient-drawer.component';

export interface Recipient {
  id: string;
  name: string;
  type: 'Individual' | 'Business';
  email?: string;
  tin: string;
  tinType: 'SSN' | 'EIN';
  street: string;
  cityStateZip: string;
  issue?: string;
  w9Status: 'Requested' | 'Submitted' | 'Not requested';
  forms2025: number | null;
  selected?: boolean;
}


@Component({
  selector: 'app-filer-recipient',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass, NgFor, AddRecipientDrawerComponent],
  templateUrl: './filer-recipient.component.html',
  styleUrl: './filer-recipient.component.scss'
})
export class FilerRecipientComponent {

  searchQuery: string = '';

  recipients: Recipient[] = [
    {
      id: 'r1',
      name: 'Mark Waugh',
      type: 'Individual',
      email: 'mark.waugh@example.com',
      tin: '•••-••-2330',
      tinType: 'SSN',
      street: '101 Market St',
      cityStateZip: 'Rockville, MD 20850',
      w9Status: 'Requested',
      forms2025: 1
    },
    {
      id: 'r2',
      name: 'Derek Randal',
      type: 'Individual',
      tin: '•••-••-5678',
      tinType: 'SSN',
      street: '20 East Bank St',
      cityStateZip: 'MENDOZA',
      issue: '“MENDOZA” isn\'t a US state · City missing · ZIP missing',
      w9Status: 'Submitted',
      forms2025: null
    },
    {
      id: 'r3',
      name: 'Tariq Fateh',
      type: 'Individual',
      tin: '88765878',
      tinType: 'SSN',
      street: '36 Market Street',
      cityStateZip: 'Gaithersburg, MD 20878',
      issue: 'TIN has 8 digits',
      w9Status: 'Not requested',
      forms2025: null
    },
    {
      id: 'r4',
      name: 'Priya Nair',
      type: 'Individual',
      email: 'priya.nair@example.com',
      tin: '•••-••-9021',
      tinType: 'SSN',
      street: '55 Oak Ave',
      cityStateZip: 'San Jose, CA 95112',
      w9Status: 'Submitted',
      forms2025: 1
    },
    {
      id: 'r5',
      name: 'Hillside Legal Group PC',
      type: 'Business',
      email: 'billing@hillsidelegal.example',
      tin: '52-1234102',
      tinType: 'EIN',
      street: '1 Court Sq',
      cityStateZip: 'Towson, MD 21204',
      w9Status: 'Submitted',
      forms2025: 1
    },
    {
      id: 'r6',
      name: 'Rockcreek Office LLC',
      type: 'Business',
      tin: '54-0987730',
      tinType: 'EIN',
      street: '800 Rock Creek Pkwy',
      cityStateZip: 'Arlington, VA 22201',
      w9Status: 'Submitted',
      forms2025: 1
    }
  ];

  getW9Class(status: string): string {
    switch (status) {
      case 'Requested': return 'pill-requested';
      case 'Submitted': return 'pill-submitted';
      case 'Not requested': return 'pill-not-requested';
      default: return '';
    }
  }

  hasSelection(): boolean {
    return this.recipients.some(r => r.selected);
  }

  isAllSelected(): boolean {
    return this.recipients.length > 0 && this.recipients.every(r => r.selected);
  }

  selectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.recipients.forEach(r => r.selected = checked);
  }

  onSearch(): void {
    console.log('Searching for:', this.searchQuery);
  }

  resendW9(recipient: Recipient): void {
    console.log('Resend W-9 for:', recipient.name);
  }

  requestW9(recipient: Recipient): void {
    console.log('Request W-9 for:', recipient.name);
  }

  addRecipient(): void {
    console.log('Add recipient action triggered');
  }

  exportRecipients(): void {
    console.log('Exporting recipients');
  }

  get filteredRecipients(): Recipient[] {
  if (!this.searchQuery.trim()) {
    return this.recipients; // Returns all 6 items when search is empty
  }
  const query = this.searchQuery.toLowerCase();
  return this.recipients.filter(r => 
    r.name.toLowerCase().includes(query) || 
    r.cityStateZip.toLowerCase().includes(query) ||
    r.tin.includes(query)
  );
}

  onAction(recipient: Recipient): void {
    if (recipient.issue) {
      console.log('Fix recipient details:', recipient);
    } else {
      console.log('Edit recipient details:', recipient);
    }
  }

  isDrawerOpen = false;

  handleRecipientSave(event: { data: RecipientFormData; requestW9: boolean }) {
    console.log('Saved Recipient:', event);
    this.isDrawerOpen = false;
  }

}
