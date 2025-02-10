import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-expansion-state',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './expansion-state.component.html',
  styleUrl: './expansion-state.component.css',
  providers: [provideNativeDateAdapter()]
})
export class ExpansionStateComponent {
  step = signal(0);

  setStep(index: number){
    this.step.set(index);
  }

  nextStep(){
    this.step.update( i => i + 1);
  }

  prevStep(){
    this.step.update(i => i-1);
  }
}
