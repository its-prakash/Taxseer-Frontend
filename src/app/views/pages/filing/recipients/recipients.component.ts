import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Recipient {
  id: string;
  name: string;
  type: string;
  tin: string;
  tinType: string;
  address: string;
  w9Status: string;
  formStatus: string;
  selected: boolean;
  needsFix?: boolean;
  hasW9?: boolean;
}

@Component({
  selector: 'app-recipients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipients.component.html',
  styleUrl: './recipients.component.scss'
})
export class RecipientsComponent {

  formType: string = '1099-NEC';
  taxYear: string = '2025';
  companyName: string = 'Dillon Consulting';
  searchQuery: string = '';
  activeFilter: string = 'all';

  filterOptions = [
    { key: 'all', label: 'All' },
    { key: 'ready', label: 'Ready' },
    { key: 'fix', label: 'Needs a fix' },
    { key: 'now9', label: 'No W-9' }
  ];

  recipients: Recipient[] = [
    {
      id: 'n1791366112199',
      name: 'prem singh',
      type: 'Individual',
      tin: '•••-••-6778',
      tinType: 'SSN',
      address: 'clock tower<br>mary, AL 12345',
      w9Status: 'Not requested',
      formStatus: 'None yet',
      selected: true,
      needsFix: false,
      hasW9: false
    }
  ];

  get filteredRecipients(): Recipient[] {
    return this.recipients.filter(r => {
      // Apply Search
      const matchesSearch = !this.searchQuery.trim() || 
        r.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        r.tin.includes(this.searchQuery);

      // Apply Filter Tabs
      let matchesFilter = true;
      if (this.activeFilter === 'ready') {
        matchesFilter = !r.needsFix && !!r.hasW9;
      } else if (this.activeFilter === 'fix') {
        matchesFilter = !!r.needsFix;
      } else if (this.activeFilter === 'now9') {
        matchesFilter = !r.hasW9;
      }

      return matchesSearch && matchesFilter;
    });
  }

  get isAllSelected(): boolean {
    const list = this.filteredRecipients;
    return list.length > 0 && list.every(r => r.selected);
  }

  setFilter(filterKey: string): void {
    this.activeFilter = filterKey;
  }

  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.filteredRecipients.forEach(r => r.selected = checked);
  }

  toggleRecipientSelection(recipient: Recipient): void {
    recipient.selected = !recipient.selected;
  }

  getW9PillClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'received':
        return 'p-success';
      case 'requested':
        return 'p-info';
      case 'not requested':
      default:
        return 'p-neutral';
    }
  }

  onImportExcel(): void {
    // Excel import logic
  }

  onAddRecipient(): void {
    // Add recipient logic
  }

  onSendW9Requests(): void {
    // Send W-9 requests logic
  }

  onExport(): void {
    // Export recipients logic
  }

  onEditRecipient(recipient: Recipient): void {
    // Edit recipient logic
  }

}
