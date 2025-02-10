import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-box-joint',
  standalone: true,
  imports: [MatGridListModule, 
    MatInputModule, 
    MatButtonModule, 
    MatButtonToggleModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatSelectModule,
    ReactiveFormsModule],
  templateUrl: './box-joint.component.html',
  styleUrl: './box-joint.component.css'
})
export class BoxJointComponent {
  stockLengthControl = new FormControl(98);
  cutterWidthControl = new FormControl(8);
  toleranceControl = new FormControl(.5);
  fingerWidthControl = new FormControl(24);
  fingerLengthControl = new FormControl(75);
  firstCutControl = new FormControl('Finger');

  generate(){
    let stockLength = this.stockLengthControl.value ? this.stockLengthControl.value : 0;
    let cutterWidth = this.cutterWidthControl.value ? this.cutterWidthControl.value : 0;
    let tolerance = this.toleranceControl.value ? this.toleranceControl.value : 0;
    let fingerWidth = this.fingerWidthControl.value ? this.fingerWidthControl.value : 0;
    let cutType = this.firstCutControl.value ? this.firstCutControl.value : "Invalid";

    let sl = 0;
    let cPosition = 0;
    if(cutType === 'Gap'){
      cPosition = cutterWidth;
    }else {
      cPosition = fingerWidth + cutterWidth - tolerance/2;
    }
    do {
      // move the cutter to c position.
      // move the cutter to desired z
      // move the cutter to cut fngerlength
      cPosition += fingerWidth-cutterWidth + tolerance;
      // move the cutter to cPosition.
      // move the cutter to fingerlength 0
      cPosition += fingerWidth + cutterWidth


     
    } while(cPosition < stockLength);
  }
}
