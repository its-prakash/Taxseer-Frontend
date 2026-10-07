import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface FormItem {
  id: string;
  formType: string;
  recipientName: string;
  tin: string;
  box1Amount: number | null;
  status: string;
  statusNote?: string;
  lastChanged: string;
}

@Component({
  selector: 'app-filer-filings',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './filer-filings.component.html',
  styleUrl: './filer-filings.component.scss'
})
export class FilerFilingsComponent {


  taxYear: string = '2025';
  taxYears: string[] = ['2025', '2024', '2023'];

  selectedForm: string = 'all';
  searchQuery: string = '';
  activeTab: string = 'pending';

  statusTabs = [
    { key: 'pending', count: 1, label: 'Pending', subtext: 'Missing information' },
    { key: 'completed', count: 2, label: 'Completed', subtext: 'Ready for the cart' },
    { key: 'cart', count: 1, label: 'In cart', subtext: 'Waiting for checkout' },
    { key: 'submitted', count: 0, label: 'Submitted', subtext: 'With IRS / SSA' },
    { key: 'accepted', count: 29, label: 'Accepted', subtext: 'Filed' },
    { key: 'rejected', count: 0, label: 'Rejected', subtext: 'None' }
  ];

  filings: FormItem[] = [
    {
      id: 'f1',
      formType: '1099-NEC',
      recipientName: 'Mark Waugh',
      tin: '•••-••-2330',
      box1Amount: null,
      status: 'pending',
      statusNote: 'Box 1 is empty',
      lastChanged: 'Jan 13, 2026'
    }
  ];

  get filteredFilings(): FormItem[] {
    if (!this.filings || this.filings.length === 0) {
      return [];
    }

    return this.filings.filter(item => {
      // 1. Tab Status Filter
      const matchesTab = !this.activeTab || item.status.toLowerCase() === this.activeTab.toLowerCase();

      // 2. Form Type Select Filter ('all', '1099-NEC', etc.)
      const matchesForm = this.selectedForm === 'all' || item.formType === this.selectedForm;

      // 3. Search Query Filter
      const query = (this.searchQuery || '').trim().toLowerCase();
      const matchesSearch = !query ||
        item.recipientName.toLowerCase().includes(query) ||
        item.tin.toLowerCase().includes(query);

      return matchesTab && matchesForm && matchesSearch;
    });
  }

  selectTab(tabKey: string): void {
    this.activeTab = tabKey;
  }

  onFinish(item: FormItem): void {
    console.log('Finish form:', item);
  }

  onPreview(item: FormItem): void {
    console.log('Preview form:', item);
  }

  onDelete(item: FormItem): void {
    this.filings = this.filings.filter(f => f.id !== item.id);
  }

  applyForExtension(): void {
    alert('Form 8809 extension request opened for Tech International Corporation');
  }
}
