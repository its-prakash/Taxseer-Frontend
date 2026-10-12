import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-filer',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './create-filer.component.html',
  styleUrl: './create-filer.component.scss'
})
export class CreatFilerComponent implements OnInit, OnChanges {
@Input() filerData: any = null;
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() saveFiler = new EventEmitter<any>();

  filerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm(this.filerData);
  }

  ngOnChanges(changes: SimpleChanges): void {
  if (changes['filerData'] && this.filerForm) {
    if (this.filerData) {
      // Edit mode: populate form with existing data
      this.filerForm.patchValue(this.mapToFormValues(this.filerData));
    } else {
      // Add mode: reset form to empty defaults
      this.filerForm.reset({
        id: null,
        legalName: '',
        ein: '',
        phone: '',
        streetAddress: '',
        suite: '',
        city: '',
        state: 'MD',
        zip: '',
        contactEmail: '',
        payerStateId: ''
      });
    }
  }
}

  // Maps backend entity field names to reactive form control names
  private mapToFormValues(data: any): any {
    if (!data) return {};
    return {
      id: data.id || null,
      legalName: data.name || data.legalName || '',
      ein: data.ein || '',
      phone: data.phone || '',
      streetAddress: data.addr || data.streetAddress || '',
      suite: data.addr2 || data.suite || '',
      city: data.city || '',
      state: data.st || data.state || 'MD',
      zip: data.zip || '',
      contactEmail: data.email || data.contactEmail || '',
      payerStateId: data.stateNo || data.payerStateId || ''
    };
  }

  private initForm(data: any): void {
    const mappedData = this.mapToFormValues(data);

    this.filerForm = this.fb.group({
      id: [mappedData.id],
      legalName: [mappedData.legalName, Validators.required],
      ein: [mappedData.ein, Validators.required],
      phone: [mappedData.phone],
      streetAddress: [mappedData.streetAddress, Validators.required],
      suite: [mappedData.suite],
      city: [mappedData.city, Validators.required],
      state: [mappedData.state, Validators.required],
      zip: [mappedData.zip, Validators.required],
      contactEmail: [mappedData.contactEmail, [Validators.required, Validators.email]],
      payerStateId: [mappedData.payerStateId]
    });
  }

  onClose(): void {
    this.closeDrawer.emit();
  }

  onSubmit(): void {
    if (this.filerForm.valid) {
      // Send mapped object back to parent matching backend field names
      const rawValues = this.filerForm.value;
      const payload = {
        id: rawValues.id,
        name: rawValues.legalName,
        ein: rawValues.ein,
        phone: rawValues.phone,
        addr: rawValues.streetAddress,
        addr2: rawValues.suite,
        city: rawValues.city,
        st: rawValues.state,
        zip: rawValues.zip,
        email: rawValues.contactEmail,
        stateNo: rawValues.payerStateId
      };

      this.saveFiler.emit(payload);
      this.closeDrawer.emit();
    } else {
      this.filerForm.markAllAsTouched();
    }
  }
}