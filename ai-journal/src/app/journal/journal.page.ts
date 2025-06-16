import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonItemDivider,
  IonItem,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonLabel,
  IonFooter,
  IonIcon,
  IonButtons,
  
} from '@ionic/angular/standalone';

import { StorageService } from './../services/storage.service';
import { OpenaiService } from './../services/openai.service';
import { JournalEntry } from './../models/journal-entry.model';
import { v4 as uuidv4 } from 'uuid';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
  standalone: true,
  imports: [
    IonItemDivider,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonList,
    IonLabel,
    CommonModule,
    FormsModule,
    IonFooter,
    IonIcon,
  ],
})
export class JournalPage implements OnInit {
  content: string = '';
  entries: JournalEntry[] = [];

  constructor(
    private storage: StorageService,
    private openai: OpenaiService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadEntries();
  }

  async loadEntries() {
    this.entries = await this.storage.getEntries();
  }

  async saveEntry() {
    // this.content = "This is a test entry for the journal app. It will be analyzed by OpenAI to determine sentiment and tags.";
    console.log('Saving entry clicked:', this.content);
    if (!this.content.trim()) {
      this.showToast('Entry is empty');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Analyzing...' });
    await loading.present();

    this.openai.analyzeContent(this.content).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        try {
          const json = JSON.parse(res.choices[0].message.content);
          const entry: JournalEntry = {
            id: uuidv4(),
            date: new Date().toISOString(),
            content: this.content,
            sentiment: json.sentiment.toLowerCase(),
            tags: json.tags,
          };

          await this.storage.saveEntry(entry);
          this.content = '';
          await this.loadEntries();
          this.showToast('Entry saved successfully');
        } catch (e) {
          this.showToast('Failed to parse AI response');
        }
      },
      error: async () => {
        await loading.dismiss();
        this.showToast('OpenAI API error');
      },
    });
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({ message: msg, duration: 2000 });
    await toast.present();
  }

  openGraph() {
    // Placeholder for sentiment analysis action
   this.router.navigate(['/analytics']);
  }
}
