import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ReviewRecipient {
  id: string;
  name: string;
  tin: string;
  box1: number;
  box4: number;
  box6: string;
  deliveryMethod: 'email' | 'mail' | 'self';
  status: 'Ready' | 'Fix';
}

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  companyName: string = 'Tech International Corporation';
  ein: string = '11-1111111';
  taxYear: number = 2025;
  stateCopiesText: string = 'AL included';

  recipients: ReviewRecipient[] = [
    {
      id: 'r1',
      name: 'Mark Waugh',
      tin: '•••-••-2330',
      box1: 12345678.00,
      box4: 1234.00,
      box6: 'AL 12345678',
      deliveryMethod: 'email',
      status: 'Ready'
    }
  ];

  get formsCount(): number {
    return this.recipients.length;
  }

  get totalBox1(): number {
    return this.recipients.reduce((sum, r) => sum + r.box1, 0);
  }

  get totalFederalWithheld(): number {
    return this.recipients.reduce((sum, r) => sum + r.box4, 0);
  }

  downloadDraftPdfs(): void {
    // Logic to trigger draft PDF downloads
  }

  editRecipient(id: string): void {
    // Logic to route to edit step for recipient
  }
}
