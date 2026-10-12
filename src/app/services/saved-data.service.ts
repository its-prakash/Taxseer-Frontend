import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DashboardService, Filer } from './dashboard.service';

export interface SelectedFilingSelection {
  year: number | string | null;
  form: { id: string; name: string } | null;
}

export interface FormRecipientRow {
  id: string;
  recipientName: string;
  tin: string;
  box1: number | null;
  box4: number | null;
  box5: number | null;
  box7: number | null;
  state: string;
  stateNo: string;
  expanded?: boolean;
  status: 'Ready' | 'Fix';
  errorMessage?: string;
  deliveryMethod?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SavedDataService {
  private _dashboardService = inject(DashboardService);

  // Filer Selection
  private selectedFilerSubject = new BehaviorSubject<Filer | null>(null);
  selectedFiler$: Observable<Filer | null> = this.selectedFilerSubject.asObservable();

  setSelectedFiler(filer: Filer): void {
    this.selectedFilerSubject.next(filer);
  }

  getSelectedFiler(): Filer | null {
    return this.selectedFilerSubject.getValue();
  }

  getSelectedFilerId(): number | null {
    return this.selectedFilerSubject.getValue()?.id ?? null;
  }

  clearSelection(): void {
    this.selectedFilerSubject.next(null);
  }

  // Tax Year & Form Selection
  private filingSelectionSubject = new BehaviorSubject<SelectedFilingSelection>({
    year: '2025',
    form: null
  });
  public filingSelection$ = this.filingSelectionSubject.asObservable();

  setSelectedYear(year: number | string): void {
    const current = this.filingSelectionSubject.getValue();
    this.filingSelectionSubject.next({ ...current, year });
  }

  setSelectedForm(form: { id: string; name: string }): void {
    const current = this.filingSelectionSubject.getValue();
    this.filingSelectionSubject.next({ ...current, form });
  }

  // Selected Recipients & Form Amounts State
  private selectedRecipientsSubject = new BehaviorSubject<any[]>([]);
  public selectedRecipients$ = this.selectedRecipientsSubject.asObservable();

  setSelectedRecipients(recipients: any[]): void {
    this.selectedRecipientsSubject.next(recipients);
  }

  getSelectedRecipients(): any[] {
    return this.selectedRecipientsSubject.getValue();
  }

  private formRowsSubject = new BehaviorSubject<FormRecipientRow[]>([]);
  public formRows$ = this.formRowsSubject.asObservable();

  setFormRows(rows: FormRecipientRow[]): void {
    this.formRowsSubject.next(rows);
  }

  getFormRows(): FormRecipientRow[] {
    return this.formRowsSubject.getValue();
  }
}