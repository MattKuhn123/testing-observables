import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-abiotic',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, CommonModule ],
  template: `
<fieldset [formGroup]="sessionForm">
  <legend>Abiotic Data</legend>
  <label for="crew-leader">Crew leader </label>
  <input id="crew-leader" formControlName="crewLeader" type="text" />
</fieldset>
  `,
})
export class AbioticComponent {

  @Input({ required: true })
  sessionForm!: FormGroup;
}
