import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SavedDataService, FormRecipientRow } from '../../../../services/saved-data.service';

@Component({
  selector: 'app-form-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-details.component.html',
  styleUrl: './form-details.component.scss'
})
export class FormDetailsComponent implements OnInit {
  private _savedDataService = inject(SavedDataService);

  rows: FormRecipientRow[] = [];
  stateOptions = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

  ngOnInit(): void {
    // Pull selected recipients from service and initialize editable rows
    const selectedRecipients = this._savedDataService.getSelectedRecipients();
    this.rows = selectedRecipients.map(r => ({
      id: r.id,
      recipientName: r.name,
      tin: r.tin,
      box1: null,
      box4: null,
      box5: null,
      box7: null,
      state: 'MD',
      stateNo: '',
      status: 'Ready'
    }));
    this._savedDataService.setFormRows(this.rows);
  }

  toggleExpand(row: FormRecipientRow): void {
    row.expanded = !row.expanded;
  }

  useDefaultState(): void {
    this.rows.forEach(r => r.state = 'MD');
  }

  previewCopies(): void {
    // Handle preview action
  }

  get totalBox1(): number {
    return this.rows.reduce((acc, r) => acc + (Number(r.box1) || 0), 0);
  }

  get totalBox4(): number {
    return this.rows.reduce((acc, r) => acc + (Number(r.box4) || 0), 0);
  }

  get totalBox5(): number {
    return this.rows.reduce((acc, r) => acc + (Number(r.box5) || 0), 0);
  }

  get totalBox7(): number {
    return this.rows.reduce((acc, r) => acc + (Number(r.box7) || 0), 0);
  }
}