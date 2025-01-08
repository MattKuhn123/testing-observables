import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-refactor-abiotic',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, CommonModule ],
  template: `
<fieldset [formGroup]="(sessionForm | async)!">
  <legend>Abiotic Data</legend>
  <label for="crew-leader">Crew leader </label>
  <input id="crew-leader" formControlName="crewLeader" type="text" />
</fieldset>
  `,
})
export class AbioticRefactorComponent {

  @Input({ required: true })
  sessionForm!: Observable<FormGroup>;
}
