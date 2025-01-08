import { Component, Input, OnInit } from '@angular/core';
import { LocalSessionService } from '../../../services/local-session.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SSFSite } from '../../../models/ssf-site.model';
import { CommonModule } from '@angular/common';
import { AbioticRefactorComponent } from "./abiotic.refactor.component";
import { Observable, map, startWith, switchMap, tap } from 'rxjs';
import { SitesRefactorComponent } from './sites.refactor.component';
import { SSFSession } from '../../../models/ssf-session.model';

@Component({
  selector: "app-refactor-root",
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, CommonModule, SitesRefactorComponent, AbioticRefactorComponent ],
  template: `
<form>
  <app-refactor-sites [siteControl]="siteControl" [sites]="sites"></app-refactor-sites>
  <app-refactor-abiotic [sessionForm]="sessionForm$"></app-refactor-abiotic>
</form>
  `
})
export class AppRefactorComponent implements OnInit {
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

  protected siteControl = new FormControl();
  public sessionForm$!: Observable<FormGroup>;
  
  constructor(private sessionSvc: LocalSessionService) { }
  
  ngOnInit(): void {
    this.sessionForm$ = this.siteControl.valueChanges.pipe(
      map((siteId: string) => this.sites.find(s => s.siteId === Number(siteId))),
      switchMap((site: SSFSite | undefined) => this.sessionSvc.getSession(site)),
      tap((session: SSFSession | undefined) => this.sessionForm.reset(session)),
      map(() => this.sessionForm),
      startWith(this.sessionForm),
    );
  }
}
