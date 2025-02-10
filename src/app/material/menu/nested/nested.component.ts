import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nested',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './nested.component.html',
  styleUrl: './nested.component.css'
})
export class NestedComponent {

}
