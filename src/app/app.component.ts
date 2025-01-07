import { Component, Input, OnInit } from '@angular/core';
import { LocalSessionService } from './local-session.service';
import { SSFSession } from './ssf-session.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SSFSite } from './ssf-site.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, CommonModule ],
  template: `
<form [formGroup]="sessionForm">
  <fieldset *ngIf="stations && stations.length > 0">
    <legend>Station</legend>
    <label for="station-select">Station </label>
    <select id="station-select" [formControl]="stationControl">
      <option *ngFor="let x of stations" [value]="x.siteId">
        {{ x.siteName }} 
      </option>
    </select>
  </fieldset>
  <fieldset>
    <legend>Abiotic Data</legend>
    <label for="crew-leader">Crew leader </label>
    <input id="crew-leader" formControlName="crewLeader" type="text" />
  </fieldset>
</form>
  `,
})
export class AppComponent implements OnInit {
  sessionForm = new FormGroup({
    station: new FormGroup({
      siteName: new FormControl(""),
      siteId: new FormControl(0)
    }),
    crewLeader: new FormControl("")
  });

  stationControl = new FormControl("");

  @Input()
  stations: SSFSite[] = [
    { siteName: "Reservoir_1", siteId: 1 },
    { siteName: "Reservoir_2", siteId: 2 },
    { siteName: "Reservoir_3", siteId: 3 },
  ]

  constructor(private sessionSvc: LocalSessionService) { }
  
  ngOnInit(): void {
    this.stationControl.valueChanges.subscribe(x => {
      this.handleSelectSite(this.stations.find(y => Number(x) === y.siteId));
    });
  }

  protected handleSelectSite(ssfSite: SSFSite | undefined): void {
    if (!ssfSite) {
      return;
    }

    this.sessionSvc.getSession(ssfSite).subscribe(result => {
      if (result) {
        this.loadSSFSession(result);
      } else {
        this.resetSSFSession();
        this.saveSSFSession();
      }
    });
  }

  private resetSSFSession(): void {
    this.sessionForm.reset();
  }

  private loadSSFSession(sessionToLoad: SSFSession): void {
    this.sessionForm.reset(sessionToLoad);
  }

  private saveSSFSession(): void {
    // TODO
  }
}
