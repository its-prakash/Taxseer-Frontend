import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService, Filer } from '../../../../services/dashboard.service';
import { SavedDataService } from '../../../../services/saved-data.service';

@Component({
  selector: 'app-dashboard-filers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-filers.component.html',
  styleUrl: './dashboard-filers.component.scss'
})
export class DashboardFilersComponent implements OnInit {
  private _dashboardService = inject(DashboardService);
  private _savedDataService = inject(SavedDataService);

  filers: Filer[] = [];
  filteredFilers: Filer[] = [];
  recentFilers: Filer[] = [];
  allFilers: Filer[] = [];
  
  searchQuery = '';
  isLoading = false;
  errorMessage = '';
  selectedFiler: Filer | null = null;

  ngOnInit(): void {
    this.loadFilers();
  }

  loadFilers(): void {
    this.isLoading = true;
    this._dashboardService.getFilers().subscribe({
      next: (data) => {
        this.filers = data;
        this.filterFilers();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load filers. Please try again.';
        this.isLoading = false;
      }
    });
  }

  filterFilers(): void {
    const q = this.searchQuery.toLowerCase().replace(/-/g, '');
    this.filteredFilers = this.filers.filter(f => 
      (f.name + f.ein).toLowerCase().replace(/-/g, '').includes(q)
    );
    this.recentFilers = this.filteredFilers.filter(f => f.isRecent);
    this.allFilers = this.filteredFilers.filter(f => !f.isRecent);
  }

  selectFiler(filer: Filer): void {
    this.selectedFiler = filer;
    this._savedDataService.setSelectedFiler(filer);
  }

  getFormattedAddress(filer: Filer): string {
    if (filer.address) return filer.address;
    return [filer.addr, filer.city, filer.st, filer.zip].filter(Boolean).join(', ');
  }

  addFiler(): void {
    // Open add filer modal or navigate
  }

  editFiler(event: Event, id: number): void {
    event.stopPropagation();
    // Open edit filer panel
  }
}