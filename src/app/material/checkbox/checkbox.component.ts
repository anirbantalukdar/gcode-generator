import { Component, model } from '@angular/core';
import {} from '@angular/forms';
import {} from '@angular/material/card';
import {} from '@angular/material/checkbox';
import {} from '@angular/material/radio';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {
  readonly checked = model(false);
  readonly indeterminate = model(false);
  readonly labelPosition = model<'before' | 'after'>('after');
  readonly disabled = model(false);
}
