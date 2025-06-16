import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar, 
  IonBackButton,  
  IonIcon,
} from '@ionic/angular/standalone';

import { StorageService } from './../services/storage.service';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    BaseChartDirective,
    IonBackButton,
    IonIcon,
  ],
})
export class AnalyticsPage implements OnInit {


  
  
  chartLabels: string[] = ['Positive', 'Neutral', 'Negative'];
  chartData: ChartData<'pie'> = {
    labels: this.chartLabels,
    datasets: [{ data: [0, 0, 0],
    backgroundColor: [
      '#4CAF50', // Positive - green
      '#FFC107', // Neutral - amber
      '#F44336'  // Negative - red
    ]
  }],
    
  };
 
  chartOptions: ChartOptions = { responsive: true };

  constructor(private storage: StorageService) {}

  async ngOnInit() {
  
    
    const entries = await this.storage.getEntries();
    console.log('chartData:', this.chartData ,entries);
    // const count = { positive: 0, neutral: 0, negative: 0 };
    const count: { [key: string]: number } = { positive: 0, neutral: 0, negative: 0 };
// counts[sentiment]++;

    entries.forEach((entry) => {
      if (entry.sentiment in count) {
        count[entry.sentiment]++;
      }
    });

    this.chartData.datasets[0].data = [
      count['positive'],
      count['neutral'],
      count['negative'],
    ];
  }
}
