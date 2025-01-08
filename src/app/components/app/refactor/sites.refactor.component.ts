import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SSFSite } from '../../../models/ssf-site.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-refactor-sites',
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
export class SitesRefactorComponent {
  @Input({ required: true })
  sites!: SSFSite[];
  
  @Input({required: true})
  siteControl!: FormControl;
}
