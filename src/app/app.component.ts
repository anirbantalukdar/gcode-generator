import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatInput } from '@angular/material/input';
import { ButtonComponent } from "./material/button/button.component";
import { BadgesComponent } from "./material/badges/badges.component";
import { MatIconModule } from '@angular/material/icon';
import { ButtonToggleComponent } from "./material/button-toggle/button-toggle.component";
import { MenuIconsComponent } from "./menu/menu-icons/menu-icons.component";
import { NestedComponent } from './material/menu/nested/nested.component';
import { OverviewComponent } from './material/grid-list/overview/overview.component';
import { GridListHarnessComponent } from './material/grid-list/grid-list-harness/grid-list-harness.component';
import { GridListDynamicComponent } from './material/grid-list/grid-list-dynamic/grid-list-dynamic.component';
import { ExpansionOverviewComponent } from './material/expansion/expansion-overview/expansion-overview.component';
import { ExpansionStateComponent } from './material/expansion/expansion-state/expansion-state.component';
import { ExpansionCollapseAllComponent } from './material/expansion/expansion-collapse-all/expansion-collapse-all.component';
import { DialogOverviewExampleDialog, DialogOverviewComponent } from './material/dialog/dialog-overview/dialog-overview.component';
import { SurfacePlannerComponent } from './surface-planner/surface-planner.component';
import { LayoutComponent } from './layout/layout.component';
import { BoxJointComponent } from './box-joint/box-joint.component';
import { MultiSlotComponent } from './multi-slot/multi-slot.component';
import { TableComponent } from './table/table.component';
import { DrillHoleComponent } from './drill-hole/drill-hole.component';
import { TestComponent } from './test/test.component';
import { TenondowellComponent } from "./tenondowell/tenondowell.component";
import { CanvasComponent } from "./canvas/canvas.component";
import { WindowplannerComponent } from './windowplanner/windowplanner.component';
import { WindowrabbetcutComponent } from './windowrabbetcut/windowrabbetcut.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonToggleComponent,
    ButtonComponent,
    CommonModule,
    RouterOutlet,
    MatSlideToggle,
    MatInput,
    ButtonComponent,
    BadgesComponent,
    MatIconModule,
    ButtonToggleComponent,
    MenuIconsComponent,
    MenuIconsComponent,
    NestedComponent,
    OverviewComponent,
    GridListHarnessComponent,
    GridListDynamicComponent,
    ExpansionOverviewComponent,
    ExpansionStateComponent,
    ExpansionCollapseAllComponent,
    DialogOverviewExampleDialog, DialogOverviewComponent,
    LayoutComponent,
    SurfacePlannerComponent,
    BoxJointComponent,
    MultiSlotComponent,
    TableComponent,
    DrillHoleComponent,
    TestComponent, TenondowellComponent, CanvasComponent,
    WindowplannerComponent,
    WindowrabbetcutComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gcode-generator';
}
