import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SSFSite } from '../models/ssf-site.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, CommonModule ],
  template: `
<fieldset>
  <legend>Stations</legend>
  <label for="station-select">Station </label>
  <select id="station-select" [formControl]="stationControl">
    <option selected></option>
    <option *ngFor="let x of stations" [value]="x.siteId">
      {{ x.siteName }} 
    </option>
  </select>
</fieldset>
  `,
})
export class StationsComponent implements OnInit {
  @Output()
  raiseSelectSite = new EventEmitter<SSFSite>;
  
  @Input()
  stations: SSFSite[] = [
    { siteName: "Reservoir_1", siteId: 1 },
    { siteName: "Reservoir_2", siteId: 2 },
    { siteName: "Reservoir_3", siteId: 3 },
  ]

  protected stationControl = new FormControl();

  ngOnInit(): void {
    this.stationControl.valueChanges.subscribe(x => 
      this.raiseSelectSite.emit(this.stations.find(y => Number(x) === y.siteId))
    );
  }
}
