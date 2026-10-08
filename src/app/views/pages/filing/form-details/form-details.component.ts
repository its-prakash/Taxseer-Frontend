import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface EntryRow {
  id: string;
  recipientName: string;
  tin: string;
  box1: string;
  box4: string;
  box5: string;
  state: string;
  stateNo: string;
  box7: string;
  status: 'Fix' | 'Ready';
  errorMessage?: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-form-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-details.component.html',
  styleUrl: './form-details.component.scss'
})
export class FormDetailsComponent{
 stateOptions: string[] = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 
    'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 
    'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'AS', 'GU', 'MP', 'PR', 'VI'
  ];

  rows: EntryRow[] = [
    {
      id: 'r1',
      recipientName: 'Mark Waugh',
      tin: '•••-••-2330',
      box1: '',
      box4: '',
      box5: '',
      state: '',
      stateNo: '',
      box7: '',
      status: 'Fix',
      errorMessage: 'Enter Box 1, Box 3 or check Box 2',
      expanded: false
    }
  ];

  get totalBox1(): number {
    return this.calculateTotal('box1');
  }

  get totalBox4(): number {
    return this.calculateTotal('box4');
  }

  get totalBox5(): number {
    return this.calculateTotal('box5');
  }

  get totalBox7(): number {
    return this.calculateTotal('box7');
  }

  private calculateTotal(key: keyof EntryRow): number {
    return this.rows.reduce((sum, row) => {
      const val = parseFloat(row[key] as string);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }

  toggleExpand(row: EntryRow): void {
    row.expanded = !row.expanded;
  }

  useDefaultState(): void {
    this.rows.forEach(r => {
      r.state = 'MD';
    });
  }

  previewCopies(): void {
    // Logic for previewing Copies
  }
}