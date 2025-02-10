import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-grid-list-dynamic',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './grid-list-dynamic.component.html',
  styleUrl: './grid-list-dynamic.component.css'
})
export class GridListDynamicComponent {
  tiles : Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDDF1' }
  ];
}
