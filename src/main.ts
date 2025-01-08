import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppCurrentComponent } from './app/components/app.component';

bootstrapApplication(AppCurrentComponent, appConfig)
  .catch((err) => console.error(err));
