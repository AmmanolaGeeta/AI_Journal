import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { JournalEntry } from '../models/journal-entry.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private STORAGE_KEY = 'journal_entries';

  async saveEntry(entry: JournalEntry) {
    const entries = await this.getEntries();
    entries.unshift(entry);  // newest first
    await Storage.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(entries)
    });
  }

  async getEntries(): Promise<JournalEntry[]> {
    const result = await Storage.get({ key: this.STORAGE_KEY });
    return result.value ? JSON.parse(result.value) : [];
  }

  async clearEntries() {
    await Storage.remove({ key: this.STORAGE_KEY });
  }
}
