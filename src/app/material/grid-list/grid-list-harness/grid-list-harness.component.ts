import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-grid-list-harness',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './grid-list-harness.component.html',
  styleUrl: './grid-list-harness.component.css'
})
export class GridListHarnessComponent {

}
