import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilerModel {
  legalName: string;
  ein: string;
  phone: string;
  streetAddress: string;
  suite: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  payerStateId: string;
}

export interface StateOption {
  code: string;
  name: string;
}

@Component({
  selector: 'app-add-filer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-filer.component.html',
  styleUrl: './add-filer.component.scss',
})
export class AddFilerComponent implements OnInit, OnChanges{
  @Output() save = new EventEmitter<FilerModel>();

  @Input() isActiveForm!: Boolean;
  @Output() closePanel = new EventEmitter<Boolean>()

  filer: FilerModel = {
    legalName: '',
    ein: '',
    phone: '',
    streetAddress: '',
    suite: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    payerStateId: '',
  };

  stateOptions: StateOption[] = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'DC', name: 'District of Columbia' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' },
    { code: 'AS', name: 'American Samoa' },
    { code: 'GU', name: 'Guam' },
    { code: 'MP', name: 'Northern Mariana Islands' },
    { code: 'PR', name: 'Puerto Rico' },
    { code: 'VI', name: 'U.S. Virgin Islands' },
  ];

  constructor(){}
  ngOnChanges(changes: SimpleChanges): void {
    this.isActiveForm = !this.isActiveForm
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    console.log(this.isActiveForm)
  }
  

  close(): void {
    this.closePanel.emit(true);
  }

  cancel(): void {
    this.close();
  }

  saveFiler(): void {
    this.save.emit(this.filer);
  }
}