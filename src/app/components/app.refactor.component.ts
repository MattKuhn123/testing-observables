import { Component, OnInit } from '@angular/core';
import { LocalSessionService } from '../services/local-session.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SSFSite } from '../models/ssf-site.model';
import { CommonModule } from '@angular/common';
import { StationsComponent } from './stations.component';
import { AbioticComponent } from './abiotic.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: "app-refactor-root",
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, CommonModule, StationsComponent, AbioticComponent ],
  templateUrl: "./app.component.html",
})
export class AppRefactorComponent implements OnInit {
  sessionForm = new FormGroup({
    station: new FormGroup({
      siteName: new FormControl(""),
      siteId: new FormControl(0)
    }),
    crewLeader: new FormControl("")
  });

  constructor(private sessionSvc: LocalSessionService) { }

  ngOnInit(): void {
    // TODO
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
