import { Component, OnInit } from '@angular/core';
import { LocalSessionService } from '../services/local-session.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SSFSite } from '../models/ssf-site.model';
import { CommonModule } from '@angular/common';
import { StationsComponent } from './stations.component';
import { AbioticComponent } from './abiotic.component';

@Component({
  selector: 'app-root-current',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, CommonModule, StationsComponent, AbioticComponent ],
  template: `
<form [formGroup]="sessionForm">
  <app-stations (raiseSelectSite)="handleSelectSite($event)"></app-stations>
  <app-abiotic [sessionForm]="sessionForm"></app-abiotic>
</form>
  `,
})
export class AppCurrentComponent implements OnInit {
  sessionForm = new FormGroup({
    station: new FormGroup({
      siteName: new FormControl(""),
      siteId: new FormControl(0)
    }),
    crewLeader: new FormControl("")
  });

  constructor(private sessionSvc: LocalSessionService) { }
  
  ngOnInit(): void {
    // this.sessionForm$ = this.stationControl.valueChanges.pipe(
    //   map(x => this.stations.find(y => Number(x) === y.siteId)),
    //   switchMap(x => this.sessionSvc.getSession(x!)),
    //   map(x => x as SSFSession)
    // )
  }

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
