import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-surface-planner',
  standalone: true,
  imports: [
    MatGridListModule, 
    MatInputModule, 
    MatButtonModule, 
    MatButtonToggleModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './surface-planner.component.html',
  styleUrl: './surface-planner.component.css'
})
export class SurfacePlannerComponent {
  cutterWidthFormControl = new FormControl(32);
  xDirLengthControl = new FormControl(100);
  yDirLengthControl = new FormControl(100);
  majorMoveAxisControl = new FormControl();
  cutOnBackControl = new FormControl();
  gcodeTextControl = new FormControl();

  generate(): void {
    this.gcodeTextControl.setValue('');

    let cutterWidth : number = this.cutterWidthFormControl.value ? this.cutterWidthFormControl.value: 0;
    let xDirLength : number = this.xDirLengthControl.value ? this.xDirLengthControl.value : 0;
    let yDirLength : number = this.yDirLengthControl.value ? this.yDirLengthControl.value : 0;
    let majorMoveAxis: string = this.majorMoveAxisControl.value ? this.majorMoveAxisControl.value : 'X';
    let cutOnBack: boolean = this.cutOnBackControl.value? (this.cutOnBackControl.value === 'yes' ? true : false) : false;   

    let majorAxisLength = majorMoveAxis === 'X' ? xDirLength : yDirLength;
    let minorAxisLength = majorMoveAxis === 'X' ? yDirLength : xDirLength;

    let stepLength = majorMoveAxis === 'X' ? yDirLength : xDirLength;
    let stepCount = Math.floor(minorAxisLength/cutterWidth);
    let majorAxisPos = 0;
    let minorAxisPos = 0;
    let textContent = '';
    for(let i=0; i<stepCount; i++){
      if(majorAxisPos === majorAxisLength){
        majorAxisPos = 0;
      }else {
        majorAxisPos = majorAxisLength;
      }
      if(majorMoveAxis === 'X'){
        textContent += 'G00 X' + majorAxisPos + '\n';
      }else {
        textContent += 'G00 Y' + majorAxisPos + '\n';
      }

      minorAxisPos += cutterWidth;
      if(majorMoveAxis === 'X'){
        textContent += 'G00 Y' + minorAxisPos + '\n';
      }else {
        textContent += 'G00 X' + minorAxisPos + '\n';
      }
    }
    console.log(cutterWidth + ', ' + xDirLength + ', ' + yDirLength + ', ' + majorMoveAxis + ', ' + cutOnBack);
    console.log(textContent);
    this.gcodeTextControl.setValue(textContent);
  }
}
