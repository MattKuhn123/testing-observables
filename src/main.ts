import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppCurrentComponent } from './app/components/app/current/app.current.component';
import { AppRefactorComponent } from './app/components/app/refactor/app.refactor.component';

bootstrapApplication(AppRefactorComponent, appConfig)
  .catch((err) => console.error(err));
