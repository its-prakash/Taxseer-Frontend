import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { DashboardService } from "../../../services/dashboard.service";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {CreatFilerComponent } from "./create-filer/create-filer/create-filer.component";
import { log } from "console";
// src/app/services/dashboard.service.ts

export interface Filer {
  // Primary Identifiers
  id: number;
  name: string;
  ein: string;

  // Granular Address Fields (Optional for UI flexibility, populated from API)
  addr?: string;
  addr2?: string;
  city?: string;
  st?: string;
  zip?: string;
  address?: string; // Pre-formatted full address string (e.g., "123 Main St, City, ST 12345")

  // Contact Details
  phone?: string;
  email?: string;
  stateNo?: string;
  date?: string;

  // UI-specific properties
  note?: string;      // UI warnings/notes (e.g., "ZIP code mismatch")
  isRecent?: boolean;  // Tab/grouping flag (Recently worked on vs All filers)

  // Filing Metrics / Status
  formsUsed?: string;
  pending?: number;
  filed2025?: number;
  w9Received?: string;
  w9Waiting?: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor, CreatFilerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  filers: Filer[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private router: Router) { }

  private _dashboardService = inject(DashboardService)

  ngOnInit(): void {
    this.fetchFilers();
  }

  goToNewFiling() {
    this.router.navigate(["/new-filing"]);
  }

  fetchFilers(): void {
    this._dashboardService.getFilers().subscribe({
      next: (data) => {
        this.filers = data;
        console.log(this.filers)
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching filers:', err);
        this.errorMessage = 'Failed to load filers data.';
        this.isLoading = false;
      }
    });
  }

  onEdit(filer: Filer): void {
    console.log('Edit filer:', filer);
  }

  onNewFiling(filer: Filer): void {
    console.log('New filing for:', filer);
  }



  // left side drawer
  isDrawerOpen = false;
  selectedFilerData: any = null;
  currentFiler: Filer | null = null;

  openEditDrawer(filer: any, data: any): void {
    this.selectedFilerData = data || filer;;
    // console.log(data)
    this.isDrawerOpen = true;
  }

  openAddDrawer(): void {
    this.currentFiler = null; // Reset object so form loads blank
    this.isDrawerOpen = true;
  }


  closeEditDrawer(): void {
    this.isDrawerOpen = false;
    this.selectedFilerData = null;
  }

  onSaveFiler(filerData: Filer): void {
    if (filerData && filerData.id) {
      // --- UPDATE EXISTING FILER ---
      this._dashboardService.updateFiler(filerData.id, filerData).subscribe({
        next: (response) => {
          console.log('Filer updated successfully:', response);

          const index = this.filers.findIndex(f => f.id === (response.id || filerData.id));
          if (index !== -1) {
            this.filers[index] = { ...this.filers[index], ...response };
          }

          this.closeEditDrawer();
          this.fetchFilers();
        },
        error: (err) => {
          console.error('Error updating filer:', err);
          alert('Failed to update filer. Please try again.');
        }
      });
    } else {
      // --- CREATE NEW FILER ---
      this._dashboardService.createFiler(filerData).subscribe({
        next: (response) => {
          console.log('Filer created successfully:', response);

          // Append the new filer returned from backend to local list
          this.filers = [response, ...this.filers];

          this.closeEditDrawer();
          this.fetchFilers();
        },
        error: (err) => {
          console.error('Error creating filer:', err);
          alert('Failed to create filer. Please try again.');
        }
      });
    }
  }



}


