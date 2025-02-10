import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-expansion-overview',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './expansion-overview.component.html',
  styleUrl: './expansion-overview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionOverviewComponent {
  readonly panelOpenState = signal(false);
}
