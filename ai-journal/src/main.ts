import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PieController, ArcElement } from 'chart.js';

import { addIcons } from 'ionicons';
import { barChartOutline,checkmarkCircle } from 'ionicons/icons';

// Register the icon before bootstrap
addIcons({
  'bar-chart-outline': barChartOutline,
    'bar-chart': barChartOutline,
   'checkmark-circle':  checkmarkCircle,
 
});

Chart.register(BarController,PieController,ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

bootstrapApplication(AppComponent, {
  providers: [
      provideHttpClient(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});

