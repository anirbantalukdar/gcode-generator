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
    let stockWidth = -30.15;
    this.gcodeTextControl.setValue('');

    xPos = 0;
    yPos = (stockWidth/3 + stockWidth/3 + cutterWidth)*(-1);
    this.appendText("\nG00 Z40 F100");
    this.appendText("\nG01 Y" + yPos);
    this.appendText("\nG00 Z0");
    for(let i=0; i<stockCount; i++){
      yPos += stockWidth;
      this.zPos = 0;
      this.appendText("\n\n\n");
      this.appendText("\nG00 Z40");
      this.appendText("\nG01 Y" + yPos);
      this.appendText("\nG01 Z0");
      let yLength = stockWidth > 0 ? stockWidth/3 - cutterWidth : stockWidth/3 + cutterWidth;
      this.generate(xPos, yPos, 108.3, yLength, -2, 6);
      this.zPos = 40;
      this.appendText("\nG01 Z" + this.zPos);
    }
    this.appendText("\nG00 X0Y0");
    this.appendText("\nG00 Z0");
    //this.generate(xPos, yPos, xDirLength, yDirLength, zDepth, zStep);
  }

  appendText(text: string){
    this.gcodeTextControl.setValue(this.gcodeTextControl.value + text);
  }
  private generate(xPos: number, yPos: number, xLength: number, yLength: number, zStep: number, zCount: number): void{
    this.appendText('\n;generating gcode for xPos = ' + xPos + ", yPos=" + yPos + ", xLength=" + xLength + ", yLength" + yLength + ", zStep=" + zStep + ", zCount=" + zCount);
    this.appendText("\nG01 X" + xPos + " Y" + yPos);

    let z = this.zPos;
    for(let i=0; i<zCount; i++){
      z = z + zStep;
      this.appendText("\nG01 Z" + z + " F500");
      this.appendText("\nG01 X" + (xPos + xLength));
      this.appendText("\nG01 Y" + (yPos + yLength));
      this.appendText("\nG01 X" + xPos);
      this.appendText("\nG01 Y" + yPos);
    }
    this.appendText("\nG01 Z" + this.zPos);
    this.appendText("\n\n")
  }
}
