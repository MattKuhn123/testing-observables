import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SSFSite } from '../../../models/ssf-site.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-sites',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, CommonModule ],
  template: `
<fieldset>
  <legend>Sites</legend>
  <label for="site-select">Site </label>
  <select id="site-select" [formControl]="siteControl">
    <option selected></option>
    <option *ngFor="let x of sites" [value]="x.siteId">
      {{ x.siteName }} 
    </option>
  </select>
</fieldset>
  `,
})
export class SitesCurrentComponent implements OnInit {
  @Output()
  raiseSelectSite = new EventEmitter<SSFSite>;
  
  @Input({ required: true })
  sites!: SSFSite[];

  protected siteControl = new FormControl();

  ngOnInit(): void {
    this.siteControl.valueChanges.subscribe(x => 
      this.raiseSelectSite.emit(this.sites.find(y => Number(x) === y.siteId))
    );
  }
}
