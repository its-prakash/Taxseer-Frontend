import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SavedDataService } from '../../../../services/saved-data.service';
import { Filer } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-form-year',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-year.component.html',
  styleUrl: './form-year.component.scss'
})
export class FormYearComponent implements OnInit {
  private _savedDataService = inject(SavedDataService);

  filer: Filer | null = null;
  availableYears = ['2025', '2024', '2023'];
  selectedYear = '2025';
  searchQuery = '';

  selectedForm: { id: string; name: string } | null = null;

  series1099Forms = [
    { id: '1099-NEC', description: 'Nonemployee compensation', category: 'previous', badge: 'Used last year' },
    { id: '1099-MISC', description: 'Rents, royalties, other income', category: '1099' },
    { id: '1099-INT', description: 'Interest income', category: '1099' },
    { id: '1099-DIV', description: 'Dividends and distributions', category: '1099' },
    { id: '1099-R', description: 'Pensions, annuities, IRAs', category: '1099' },
    { id: '1099-K', description: 'Payment card and network transactions', category: '1099' },
    { id: '1099-B', description: 'Broker and barter transactions', category: '1099' },
    { id: '1099-C', description: 'Cancellation of debt', category: '1099' },
    { id: '1099-A', description: 'Acquisition or abandonment of property', category: '1099' },
    { id: '1099-G', description: 'Certain government payments', category: '1099' },
    { id: '1099-OID', description: 'Original issue discount', category: '1099' },
    { id: '1099-PATR', description: 'Distributions from cooperatives', category: '1099' },
    { id: '1099-Q', description: 'Qualified education program payments', category: '1099' },
    { id: '1099-CAP', description: 'Changes in corporate control', category: '1099' },
    { id: '1099-H', description: 'Health coverage tax credit advances', category: '1099' },
    { id: 'W-2', description: 'Wage and tax statement', category: 'wage' },
    { id: 'W-2C', description: 'Corrected wage and tax statement', category: 'wage' },
    { id: '1095-C', description: 'Employer-provided coverage (1094-C created for you)', category: 'aca' },
    { id: '1095-B', description: 'Health coverage (1094-B created for you)', category: 'aca' },
    { id: '8809', description: 'Extension of time to file information returns', category: 'extension' }
  ];
  wageForms = [{ id: 'W-2', description: 'Wage and tax statement' }];
  acaForms = [{ id: '1095-C', description: 'Employer-provided coverage' }];
  extensionForms = [{ id: '8809', description: 'Extension of time to file' }];

  ngOnInit(): void {
    this.filer = this._savedDataService.getSelectedFiler();
    this._savedDataService.setSelectedYear(this.selectedYear);
  }

  selectYear(year: string): void {
    this.selectedYear = year;
    this._savedDataService.setSelectedYear(year);
  }

  selectForm(form: { id: string; description: string }): void {
    this.selectedForm = { id: form.id, name: form.description };
    this._savedDataService.setSelectedForm(this.selectedForm);
  }

  // Add these helper methods inside your FormYearComponent class:

  getEfileDue(): string {
    if (this.selectedForm?.id === '1099-NEC') {
      const yearNum = Number(this.selectedYear);
      return yearNum === 2025 ? `Feb 2, ${yearNum + 1}` : `Jan 31, ${yearNum + 1}`;
    }
    return 'Mar 31, ' + (Number(this.selectedYear) + 1);
  }

  getRecipientCopiesDue(): string {
    if (this.selectedForm?.id === '1099-NEC') {
      const yearNum = Number(this.selectedYear);
      return yearNum === 2025 ? `Feb 2, ${yearNum + 1}` : `Jan 31, ${yearNum + 1}`;
    }
    return 'Feb 15, ' + (Number(this.selectedYear) + 1);
  }

  openIrsInstructions(): void {
    // Handle opening IRS documentation link or toast notification
  }

  ngDoCheck() {

  }

  onChangeFiler(): void {
    // Navigate back to filer step
  }
}