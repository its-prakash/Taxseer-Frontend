import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DashboardFilersComponent, Filer } from '../filing/dashboard-filers/dashboard-filers.component';
import { FormYearComponent } from '../filing/form-year/form-year.component';
import { RecipientsComponent } from '../filing/recipients/recipients.component';
import { FormDetailsComponent } from '../filing/form-details/form-details.component';

@Component({
  selector: 'app-new-filing',
  standalone: true,
  imports: [DashboardFilersComponent, FormYearComponent, RecipientsComponent, FormDetailsComponent],
  templateUrl: './new-filing.component.html',
  styleUrl: './new-filing.component.scss'
})
export class NewFilingComponent {

  @Output() back = new EventEmitter<void>();
    @Output() continue = new EventEmitter<void>();

    @Input() selectedFilerName: string = 'Dillon Consulting';
  @Input() selectedFilerEin: string = '55-5555555';
  @Input() showBackButton: boolean = false;

  searchQuery: string = '';
  selectedFilerId: number = 7;

  filers: Filer[] = [
    { id: 1, name: 'Tech International Corporation', ein: '11-1111111', address: '200 Trafalgar Square, Gaithersburg, MD 20878', formsUsed: '1099-NEC, 1099-MISC', isRecent: true },
    { id: 9, name: 'Avi Enterprises', ein: '10-1010101', address: '9 Lakeside Dr, Columbia, MD 21044', formsUsed: '1099-NEC', isRecent: true },
    { id: 6, name: 'Precise Technologies Inc', ein: '66-6666666', address: '123 Market St, Rockville, MD 20850', formsUsed: '1095-C', isRecent: true },
    { id: 2, name: 'Maryland Trucking Company', ein: '22-2222222', address: '100 Market Street, Gaithersburg, MD 20878', formsUsed: '1099-NEC, W-2', isRecent: false },
    { id: 3, name: 'Virginia Technologies', ein: '33-3333333', address: '100 Blue Silk Lane, Rockville, MD 20850', formsUsed: 'None', isRecent: false },
    { id: 4, name: 'New York Accounting', ein: '44-4444444', address: '10 Park St, New York, NY 20878', formsUsed: '1099-NEC, 1099-INT', note: 'ZIP 20878 is not a New York ZIP. Check the filer address.', isRecent: false },
    { id: 5, name: 'Dillon Consulting', ein: '55-5555555', address: '1 Market St, Rockville, MD 20850', formsUsed: '1099-NEC', isRecent: false },
    { id: 7, name: 'Infinite Technologies', ein: '77-7777777', address: '111 King James Way, Bethesda, MD 20831', formsUsed: '1099-NEC, 1099-MISC', isRecent: false },
    { id: 8, name: 'Nextlinx Technologies Inc', ein: '99-9999999', address: '1 Rayfield Drive, Germantown, MD 20877', formsUsed: 'W-2', isRecent: false }
  ];

  get recentFilers(): Filer[] {
    return this.filteredFilers.filter(f => f.isRecent);
  }

  get allFilers(): Filer[] {
    return this.filteredFilers.filter(f => !f.isRecent);
  }

  get filteredFilers(): Filer[] {
    if (!this.searchQuery.trim()) {
      return this.filers;
    }
    const query = this.searchQuery.toLowerCase();
    return this.filers.filter(f => 
      f.name.toLowerCase().includes(query) || f.ein.includes(query)
    );
  }

  selectFiler(id: number): void {
    this.selectedFilerId = id;
  }

  editFiler(event: MouseEvent, id: number): void {
    event.stopPropagation();
    // Logic for editing a filer
  }

  addFiler(): void {
    // Logic for adding a new filer
  }
      onBack(): void {
    this.back.emit();
  }



  onContinue(): void {
    this.continue.emit();
  }
}
