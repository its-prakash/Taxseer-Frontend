import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface FormStatusSummary {
  formType: string;
  pending: number;
  completed: number;
  cart: number;
  submitted: number;
  accepted: number;
  rejected: number;
}

@Component({
  selector: 'app-filer-form-status',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './filer-form-status.component.html',
  styleUrl: './filer-form-status.component.scss'
})
export class FilerFormStatusComponent {

  @Output() countClick = new EventEmitter<{ formType: string; status: string }>();

  taxYear: string = '2025';
  taxYears: string[] = ['2025', '2024', '2023'];

  formSummaries: FormStatusSummary[] = [
    {
      formType: '1099-NEC',
      pending: 1,
      completed: 1,
      cart: 1,
      submitted: 0,
      accepted: 26,
      rejected: 0
    },
    {
      formType: '1099-MISC',
      pending: 0,
      completed: 1,
      cart: 0,
      submitted: 0,
      accepted: 3,
      rejected: 0
    }
  ];

  // Calculate totals dynamically
  get totals(): FormStatusSummary {
    return this.formSummaries.reduce(
      (acc, curr) => ({
        formType: 'All forms',
        pending: acc.pending + curr.pending,
        completed: acc.completed + curr.completed,
        cart: acc.cart + curr.cart,
        submitted: acc.submitted + curr.submitted,
        accepted: acc.accepted + curr.accepted,
        rejected: acc.rejected + curr.rejected
      }),
      {
        formType: 'All forms',
        pending: 0,
        completed: 0,
        cart: 0,
        submitted: 0,
        accepted: 0,
        rejected: 0
      }
    );
  }

  // Calculate total forms count for a row
  getRowTotal(item: FormStatusSummary): number {
    return (
      item.pending +
      item.completed +
      item.cart +
      item.submitted +
      item.accepted +
      item.rejected
    );
  }

  onNumberClick(formType: string, status: string): void {
    console.log(`Navigating to ${formType} forms with status: ${status}`);
    this.countClick.emit({ formType, status });
  }

}
