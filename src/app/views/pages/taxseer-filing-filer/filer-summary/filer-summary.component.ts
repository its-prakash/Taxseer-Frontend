import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface SummaryReportItem {
  formType: string;
  formsCount: number;
  recipientsCount: number;
  totalBox1: number;
  federalWithheld: number;
}

@Component({
  selector: 'app-filer-summary',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './filer-summary.component.html',
  styleUrl: './filer-summary.component.scss'
})
export class FilerSummaryComponent {


  selectedYear: string = '2025';
  taxYears: string[] = ['2025', '2024', '2023'];

  activeSegment: 'filed' | 'pending' = 'filed';

  reportData: SummaryReportItem[] = [
    {
      formType: '1099-NEC',
      formsCount: 26,
      recipientsCount: 26,
      totalBox1: 405375.00,
      federalWithheld: 0.00
    },
    {
      formType: '1099-MISC',
      formsCount: 3,
      recipientsCount: 3,
      totalBox1: 49211.00,
      federalWithheld: 0.00
    }
  ];

  // Calculate totals dynamically
  get totals(): SummaryReportItem {
    return this.reportData.reduce(
      (acc, curr) => ({
        formType: `Total, tax year ${this.selectedYear}`,
        formsCount: acc.formsCount + curr.formsCount,
        recipientsCount: acc.recipientsCount + curr.recipientsCount,
        totalBox1: acc.totalBox1 + curr.totalBox1,
        federalWithheld: acc.federalWithheld + curr.federalWithheld
      }),
      {
        formType: `Total, tax year ${this.selectedYear}`,
        formsCount: 0,
        recipientsCount: 0,
        totalBox1: 0,
        federalWithheld: 0
      }
    );
  }

  setSegment(segment: 'filed' | 'pending'): void {
    this.activeSegment = segment;
  }

  exportReport(): void {
    console.log(`Summary report exported to Excel for ${this.selectedYear} (${this.activeSegment})`);
  }

}
