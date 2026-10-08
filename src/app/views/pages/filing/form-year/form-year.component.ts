import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface FormOption {
  id: string;
  description: string;
  category: 'previous' | '1099' | 'wage' | 'aca' | 'extension';
  badge?: string;
}

export interface FilerInfo {
  name: string;
  ein: string;
  address: string;
}

@Component({
  selector: 'app-form-year',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-year.component.html',
  styleUrl: './form-year.component.scss'
})

export class FormYearComponent {
  @Output() stepGo = new EventEmitter<number>();
  @Output() formSelected = new EventEmitter<{ year: string; formId: string }>();

  selectedYear: string = '2025';
  selectedForm: string = '';
  searchQuery: string = '';

  availableYears: string[] = ['2025', '2024', '2023'];

  filer: FilerInfo = {
    name: 'Dillon Consulting',
    ein: '55-5555555',
    address: '1 Market St<br>Rockville, MD 20850'
  };

  formsList: FormOption[] = [
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

  get filteredForms(): FormOption[] {
    if (!this.searchQuery.trim()) {
      return this.formsList;
    }
    const q = this.searchQuery.toLowerCase();
    return this.formsList.filter(f => 
      f.id.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
    );
  }

  get previousForms(): FormOption[] {
    return this.filteredForms.filter(f => f.category === 'previous');
  }

  get series1099Forms(): FormOption[] {
    return this.filteredForms.filter(f => f.category === '1099');
  }

  get wageForms(): FormOption[] {
    return this.filteredForms.filter(f => f.category === 'wage');
  }

  get acaForms(): FormOption[] {
    return this.filteredForms.filter(f => f.category === 'aca');
  }

  get extensionForms(): FormOption[] {
    return this.filteredForms.filter(f => f.category === 'extension');
  }

  selectYear(year: string): void {
    this.selectedYear = year;
  }

  selectForm(formId: string): void {
    this.selectedForm = formId;
    this.formSelected.emit({ year: this.selectedYear, formId });
  }

  onChangeFiler(): void {
    this.stepGo.emit(1);
  }
}
