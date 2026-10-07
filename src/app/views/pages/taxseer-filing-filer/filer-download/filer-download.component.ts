import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DownloadHistoryItem {
  id: string;
  createdDate: string;
  createdBy: string;
  contents: string;
  formsCount: number;
  status: 'Ready' | 'Expired' | 'Processing';
  statusNote?: string;
}

@Component({
  selector: 'app-filer-download',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './filer-download.component.html',
  styleUrl: './filer-download.component.scss'
})
export class FilerDownloadComponent {

  selectedYear: string = '2025';
  taxYears: string[] = ['2025', '2024', '2023'];

  downloadOptions: string[] = [
    'Recipient copies (Copy B), PDF',
    'Filer copies (Copy C), PDF',
    'State copies (Copy 1), PDF',
    'IRS acceptance acknowledgment',
    'All data, Excel'
  ];
  selectedDownloadType: string = this.downloadOptions[0];

  formsCountForYear: number = 29;

  downloadHistory: DownloadHistoryItem[] = [
    {
      id: '1',
      createdDate: 'Jan 9, 2026 4:12 PM',
      createdBy: 'Mary Pierce',
      contents: 'Recipient copies (Copy B), PDF',
      formsCount: 29,
      status: 'Ready'
    },
    {
      id: '2',
      createdDate: 'Jan 8, 2026 11:30 AM',
      createdBy: 'Mary Pierce',
      contents: 'IRS acceptance acknowledgment',
      formsCount: 29,
      status: 'Ready'
    },
    {
      id: '3',
      createdDate: 'Jan 28, 2025 9:02 AM',
      createdBy: 'Raj Mehta',
      contents: 'Filer copies (Copy C), PDF',
      formsCount: 25,
      status: 'Expired',
      statusNote: 'Prepare it again to download'
    }
  ];

  prepareDownload(): void {
    console.log(`Preparing download: ${this.selectedDownloadType} for ${this.selectedYear}`);
  }

  downloadZip(item: DownloadHistoryItem): void {
    console.log(`Downloading zip for: ${item.contents}`);
  }

}
