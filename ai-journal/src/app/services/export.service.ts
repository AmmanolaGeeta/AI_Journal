import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  constructor(private storage: StorageService) {}

  async exportEntries() {
    const entries = await this.storage.getEntries();
    const csv = Papa.unparse(entries);
    const blob = new Blob([csv], { type: 'text/csv' });
    saveAs(blob, `journal-${new Date().toISOString()}.csv`);
  }
}

