import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-multi-slot',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './multi-slot.component.html',
  styleUrl: './multi-slot.component.css'
})
export class MultiSlotComponent {
  xPositionControl = new FormControl(0);
  yPositionControl = new FormControl(0);
  cutterWidthControl = new FormControl(6);
  xDirLengthControl = new FormControl(0);
  yDirLengthControl = new FormControl(0);
  zDepthControl = new FormControl(12);
  zStepControl = new FormControl(3);
  gcodeTextControl = new FormControl();
  safeZ = 40;
  zPos = 0;

  public generateCodes(){
    let xPos : number = this.xPositionControl.value ? this.xPositionControl.value : 0;
    let yPos : number = this.yPositionControl.value ? this.yPositionControl.value : 0;
    // TODO validation checking is a must  here
    let cutterWidth : number = this.cutterWidthControl.value ? this.cutterWidthControl.value : 6;
    let xDirLength : number = this.xDirLengthControl.value ? this.xDirLengthControl.value : 0;
    let yDirLength : number = this.yDirLengthControl.value ? this.yDirLengthControl.value : 0;
    let zDepth : number = this.zDepthControl.value ? this.zDepthControl.value : 0;
    let zStep : number = this.zStepControl.value ? this.zStepControl.value : 0;
    let stockCount = 8;
    let stockWidth = -30
    
    
    ;
    this.gcodeTextControl.setValue('');

    xPos = 0;
    let stockDir = stockWidth/Math.abs(stockWidth);
    let xDir = 1;
    let slotWidth = stockWidth/3;

    yPos = yPos + (stockWidth - slotWidth)/2 + cutterWidth * stockDir;

    let xPositions = [10];
    for(let i=0; i<stockCount; i++){
      for(let j=0; j < xPositions.length; j++){
        xPos = xPositions[j];
        this.cutSlot(xPos + xDir * cutterWidth/2, yPos, 83, slotWidth - cutterWidth * stockDir, -2, 1);
        yPos += stockWidth;
      }
    }
    this.appendText("\nG00 X0Y0");
    this.appendText("\nG00 Z0");
  }

  private cutSlot(xPos: number, yPos: number, xLength: number, yLength: number, zStep: number, zCount: number): void{
    //this.appendText('\n;generating gcode for xPos = ' + xPos + ", yPos=" + yPos + ", xLength=" + xLength + ", yLength" + yLength + ", zStep=" + zStep + ", zCount=" + zCount);
    this.moveTo(xPos, yPos);

    let z = this.zPos;
    for(let i=0; i<zCount; i++){
      z = z + zStep;
      this.appendText("\nG01 Z" + z + " F900");
      this.appendText("\nG01 X" + (xPos + xLength));
      this.appendText("\nG01 Y" + (yPos + yLength));
      this.appendText("\nG01 X" + xPos);
      this.appendText("\nG01 Y" + yPos);
    }
    this.appendText("\nG00 Z" + this.zPos);
    this.appendText("\n\n")
  }

  public moveTo(xPos: number, yPos: number){
    this.appendText("\nG00 Z" + this.safeZ);
    this.appendText("\nG00 X" + xPos + " Y" + yPos);
    this.appendText("\nG00 Z" + this.zPos);
  }

  appendText(text: string){
    this.gcodeTextControl.setValue(this.gcodeTextControl.value + text);
  }
}
