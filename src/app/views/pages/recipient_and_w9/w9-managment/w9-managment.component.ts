import { Component, inject, OnInit } from '@angular/core';
import { W9ManagmentService } from '../w9-managment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export type W9Status = 'Submitted' | 'Requested' | 'Not requested';

// Match your exact backend entity fields
export interface RecipientEntity {
  id?: number;
  filer: number;
  type?: string;
  tin: string;
  first?: string;
  middle?: string;
  last?: string;
  biz?: string;
  dba?: string;
  country?: string;
  addr?: string;
  addr2?: string;
  city?: string;
  st?: string;
  zip?: string;
  email: string;
  econsent?: boolean;
  w9: W9Status;
  sent?: string;
  got?: string;
  rem?: number;
}

export interface RecipientVM extends RecipientEntity {
  name: string;
  filerName: string;
  w9Status: W9Status;
  sentDate?: string;
  receivedDate?: string;
  remindersCount?: number;
}

export interface FilerGroup {
  filerId: number;
  name: string;
  all: RecipientVM[];
  sent: RecipientVM[];
  got: RecipientVM[];
  wait: RecipientVM[];
  notReq: number;
  oldest?: RecipientVM;
  pct: number;
  open: boolean;
  filtered: RecipientVM[];
}

@Component({
  selector: 'app-w9-managment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './w9-managment.component.html',
  styleUrl: './w9-managment.component.scss'
})
export class W9ManagmentComponent implements OnInit {
  private _w9Service = inject(W9ManagmentService);

  recipients: RecipientVM[] = [];
  groups: FilerGroup[] = [];

  isLoading = false;
  errorMsg = '';
  toastMsg = '';

  query = '';
  onlyOpen = false;
  tileFilter = '';
  allExpanded = false;
  waitingCount = 0;

  tiles: any[] = [];

  PILL: Record<string, string> = {
    'Submitted': 'p-ok',
    'Requested': 'p-warn',
    'Not requested': ''
  };

  ngOnInit(): void {
    this.loadRecipients();
  }

  loadRecipients(): void {
    this.isLoading = true;
    this.errorMsg = '';
    this._w9Service.getRecipients().subscribe({
      next: (data: RecipientEntity[]) => {
        // Map backend entity fields to frontend VM fields
        this.recipients = data.map(r => {
          // Construct recipient display name
          const fullName = r.biz || [r.first, r.last].filter(Boolean).join(' ') || 'Unnamed Recipient';

          // Map filer ID to a readable name via a lookup dictionary
          const filerDisplayNames: Record<number, string> = {
            1: 'Avi Enterprises',
            2: 'Maryland Trucking Company',
            3: 'Precise Technologies Inc',
            4: 'Tech International Corporation'
          };

          return {
            ...r,
            name: fullName,
            filerName: filerDisplayNames[r.filer] || `Filer #${r.filer}`,
            w9Status: r.w9,
            sentDate: r.sent,
            receivedDate: r.got,
            remindersCount: r.rem
          };
        });

        this.isLoading = false;
        this.processData();
      },
      error: (err) => {
        console.error('Failed to load recipients', err);
        this.errorMsg = 'Failed to load W-9 recipients. Please try again.';
        this.isLoading = false;
      }
    });
  }

  processData(): void {
    // Build tiles metrics
    const totalRecipients = this.recipients.length;
    const waiting = this.recipients.filter(r => r.w9Status === 'Requested');
    this.waitingCount = waiting.length;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const waitingOver30 = waiting.filter(r => r.sentDate && new Date(r.sentDate) < thirtyDaysAgo).length;
    const neverRequested = this.recipients.filter(r => r.w9Status === 'Not requested').length;

    this.tiles = [
      { key: '', label: 'recipients across all filers', value: totalRecipients, cls: '' },
      { key: 'waiting', label: 'waiting for the recipient', value: waiting.length, cls: 'warn' },
      { key: 'overdue', label: 'waiting more than 30 days', value: waitingOver30, cls: 'err' },
      { key: 'not_requested', label: 'never requested', value: neverRequested, cls: '' }
    ];

    // Group by Filer Name
    const groupMap = new Map<string, RecipientVM[]>();
    this.recipients.forEach(r => {
      const key = r.filerName || 'Unknown Filer';
      if (!groupMap.has(key)) {
        groupMap.set(key, []);
      }
      groupMap.get(key)!.push(r);
    });

    let computedGroups: FilerGroup[] = [];
    let filerCounter = 1;

    groupMap.forEach((recs, filerName) => {
      const sent = recs.filter(r => r.w9Status !== 'Not requested');
      const got = recs.filter(r => r.w9Status === 'Submitted');
      const wait = recs.filter(r => r.w9Status === 'Requested');
      const notReq = recs.filter(r => r.w9Status === 'Not requested').length;
      const pct = sent.length > 0 ? Math.round((got.length / sent.length) * 100) : 0;

      // Find oldest waiting
      let oldest: RecipientVM | undefined = undefined;
      if (wait.length > 0) {
        oldest = [...wait].sort((a, b) => {
          const dateA = a.sentDate ? new Date(a.sentDate).getTime() : 0;
          const dateB = b.sentDate ? new Date(b.sentDate).getTime() : 0;
          return dateA - dateB;
        })[0];
      }

      computedGroups.push({
        filerId: filerCounter++,
        name: filerName,
        all: recs,
        sent,
        got,
        wait,
        notReq,
        oldest,
        pct,
        open: this.allExpanded,
        filtered: recs
      });
    });

    // Apply filtering
    this.groups = computedGroups.map(g => {
      let filteredRecs = g.all;

      if (this.query) {
        const q = this.query.toLowerCase();
        filteredRecs = filteredRecs.filter(r => r.name.toLowerCase().includes(q) || g.name.toLowerCase().includes(q));
      }

      if (this.tileFilter === 'waiting') {
        filteredRecs = filteredRecs.filter(r => r.w9Status === 'Requested');
      } else if (this.tileFilter === 'overdue') {
        filteredRecs = filteredRecs.filter(r => {
          if (r.w9Status !== 'Requested' || !r.sentDate) return false;
          return this.ago(r.sentDate) > 30;
        });
      } else if (this.tileFilter === 'not_requested') {
        filteredRecs = filteredRecs.filter(r => r.w9Status === 'Not requested');
      }

      return {
        ...g,
        filtered: filteredRecs
      };
    }).filter(g => {
      if (this.onlyOpen && g.wait.length === 0) return false;
      if (this.query || this.tileFilter) {
        return g.filtered.length > 0 || g.name.toLowerCase().includes(this.query.toLowerCase());
      }
      return true;
    });
  }

  setTile(key: string): void {
    this.tileFilter = this.tileFilter === key ? '' : key;
    this.processData();
  }

  onQueryChange(): void {
    this.processData();
  }

  onOnlyOpenChange(): void {
    this.processData();
  }

  toggleExpandAll(): void {
    this.allExpanded = !this.allExpanded;
    this.groups.forEach(g => g.open = this.allExpanded);
  }

  toggleFiler(filerName: string): void {
    const g = this.groups.find(item => item.name === filerName);
    if (g) {
      g.open = !g.open;
    }
  }

  clearFilters(): void {
    this.query = '';
    this.onlyOpen = false;
    this.tileFilter = '';
    this.processData();
  }

  ago(dateStr: string): number {
    const diff = new Date().getTime() - new Date(dateStr).getTime();
    return Math.floor(diff / (1000 * 3600 * 24));
  }

  fmt(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  hasInvalidTin(tin: string): boolean {
    return !tin || tin.includes('invalid');
  }

  historyText(r: RecipientVM): string {
    if (r.w9Status === 'Submitted' && r.receivedDate) {
      return `Received ${this.fmt(r.receivedDate)}`;
    }
    if (r.w9Status === 'Requested' && r.sentDate) {
      const days = this.ago(r.sentDate);
      const rems = r.remindersCount ? ` · ${r.remindersCount} reminder${r.remindersCount > 1 ? 's' : ''}` : '';
      return `Sent ${this.fmt(r.sentDate)} · ${days} days${rems}`;
    }
    return 'Not requested yet';
  }

  toast(msg: string): void {
    this.toastMsg = msg;
    setTimeout(() => {
      if (this.toastMsg === msg) {
        this.toastMsg = '';
      }
    }, 3000);
  }

  remindAll(): void {
    const waitingIds = this.recipients.filter(r => r.w9Status === 'Requested' && r.id).map(r => r.id!);
    if (waitingIds.length === 0) return;
    this._w9Service.sendW9Request(waitingIds).subscribe({
      next: () => {
        this.toast(`Sent reminders to all ${waitingIds.length} waiting recipients`);
        this.loadRecipients();
      },
      error: () => this.toast('Failed to send reminders')
    });
  }

  remindFiler(filerId: number, filerName: string): void {
    const g = this.groups.find(x => x.filerId === filerId);
    if (!g) return;
    const ids = g.wait.map(r => r.id!).filter(Boolean);
    if (ids.length === 0) return;
    this._w9Service.sendW9Request(ids).subscribe({
      next: () => {
        this.toast(`Reminder sent for ${filerName}`);
        this.loadRecipients();
      },
      error: () => this.toast('Failed to send reminder')
    });
  }

  requestAll(filerId: number, filerName: string): void {
    const g = this.groups.find(x => x.filerId === filerId);
    if (!g) return;
    const ids = g.all.filter(r => r.w9Status === 'Not requested' && r.id).map(r => r.id!);
    if (ids.length === 0) return;
    this._w9Service.sendW9Request(ids).subscribe({
      next: () => {
        this.toast(`W-9 requests sent for ${filerName}`);
        this.loadRecipients();
      },
      error: () => this.toast('Failed to request W-9s')
    });
  }

  sendRequest(id?: number): void {
    if (!id) return;
    this._w9Service.sendW9Request([id]).subscribe({
      next: () => {
        this.toast('W-9 request sent successfully');
        this.loadRecipients();
      },
      error: () => this.toast('Failed to send W-9 request')
    });
  }
}