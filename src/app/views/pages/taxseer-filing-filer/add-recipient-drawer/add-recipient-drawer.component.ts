import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface RecipientFormData {
  tinType: 'SSN' | 'EIN' | 'PENDING';
  tin: string;
  firstName: string;
  middleName: string;
  lastName: string;
  country: string;
  streetAddress: string;
  aptSuite: string;
  city: string;
  state: string;
  zip: string;
  email: string;
}

@Component({
  selector: 'app-add-recipient-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './add-recipient-drawer.component.html',
  styleUrl: './add-recipient-drawer.component.scss'
})
export class AddRecipientDrawerComponent {

  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ data: RecipientFormData; requestW9: boolean }>();

private getInitialFormData(): RecipientFormData {
    return {
      tinType: 'SSN',
      tin: '',
      firstName: '',
      middleName: '',
      lastName: '',
      country: 'United States',
      streetAddress: '',
      aptSuite: '',
      city: '',
      state: '',
      zip: '',
      email: ''
    };
  }

  formData: RecipientFormData = this.getInitialFormData();
  states: string[] = ['AL', 'CA', 'MD', 'NY', 'TX', 'VA', 'WA'];

  onClose(): void {
    this.formData = this.getInitialFormData(); // Reset form state
    this.close.emit();
  }

  onSave(requestW9: boolean = false): void {
    this.save.emit({ data: { ...this.formData }, requestW9 });
    this.onClose();
  }
  

}
