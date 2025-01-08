import { Component, Input } from '@angular/core';
import { LocalSessionService } from '../../../services/local-session.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SSFSite } from '../../../models/ssf-site.model';
import { CommonModule } from '@angular/common';
import { SitesCurrentComponent } from './sites.current.component';
import { AbioticCurrentComponent } from './abiotic.current.component';

@Component({
  selector: 'app-current-root',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, CommonModule, SitesCurrentComponent, AbioticCurrentComponent ],
  template: `
<form>
  <app-current-sites (raiseSelectSite)="handleSelectSite($event)" [sites]="sites"></app-current-sites>
  <app-current-abiotic [sessionForm]="sessionForm"></app-current-abiotic>
</form>
`,
})
export class AppCurrentComponent {
  sessionForm = new FormGroup({
    site: new FormGroup({
      siteName: new FormControl(""),
      siteId: new FormControl(0)
    }),
    crewLeader: new FormControl("")
  });

  @Input()
  sites = [
    { siteName: "Reservoir_1", siteId: 1 },
    { siteName: "Reservoir_2", siteId: 2 },
    { siteName: "Reservoir_3", siteId: 3 },
  ];

  constructor(private sessionSvc: LocalSessionService) { }

  protected handleSelectSite(ssfSite: SSFSite | undefined): void {
    if (!ssfSite) {
      this.sessionForm.reset();
      return;
    }

    debugger;
    this.sessionSvc.getSession(ssfSite).subscribe(result => {
      debugger;
      this.sessionForm.reset(result);
    });
  }
}
