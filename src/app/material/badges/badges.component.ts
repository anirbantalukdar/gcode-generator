import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule],
  templateUrl: './badges.component.html',
  styleUrl: './badges.component.css'
})
export class BadgesComponent {
  hidden = false;
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
