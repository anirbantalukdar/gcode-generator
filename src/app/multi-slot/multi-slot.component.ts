import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


export class DowelSlot {
  xPosition: number;
  dowels: Array<number>;
  stockWidth: number;
  slotWidth: number;
  slotLength: number;

  public constructor(x: number, stockWidth: number, slotWidth: number, slotLength: number){
    this.xPosition = x;
    this.dowels = new Array<number>();
    this.slotWidth = slotWidth;
    this.stockWidth = stockWidth;
    this.slotLength = slotLength;
  }

  public addDowel(x: number){
    this.dowels.push(x);
  }

  public addDowels(xPostions: number[]){
    xPostions.forEach(x => {
      this.dowels.push(x);
    });
  }
}
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
    // TODO validation checking is a must  here
    let cutterWidth : number = this.cutterWidthControl.value ? this.cutterWidthControl.value : 6;
    let xDirLength : number = this.xDirLengthControl.value ? this.xDirLengthControl.value : 0;
    let yDirLength : number = this.yDirLengthControl.value ? this.yDirLengthControl.value : 0;
    let zDepth : number = this.zDepthControl.value ? this.zDepthControl.value : 0;
    let zStep : number = this.zStepControl.value ? this.zStepControl.value : 0;
    let stockCount = 4;
    //let stockWidth = -30;
    this.gcodeTextControl.setValue('');

    let dowelSlots = new Array<DowelSlot>();

    let dowelSlot = new DowelSlot(0, -30, -10, 25.4*3.5);
    dowelSlots.push(dowelSlot);
    dowelSlot.addDowels([25, 75]);

    dowelSlot = new DowelSlot(1005,-30.5, -10, 25.4*4.5);
    dowelSlot.addDowels([40, 90]);
    dowelSlots.push(dowelSlot);

    let xDir = 1;

    let yPos = 0;

    for(let i=0; i < dowelSlots.length; i++){
      let dowelSlot = dowelSlots[i];
      let stockDir = dowelSlot.stockWidth/Math.abs(dowelSlot.stockWidth);
      yPos = (dowelSlot.stockWidth - dowelSlot.slotWidth)/2 + cutterWidth * stockDir;
      for(let j=0; j<stockCount; j++){
        this.cutSlot(dowelSlot.xPosition + xDir * cutterWidth/2, yPos, dowelSlot.slotLength - xDir*cutterWidth, dowelSlot.slotWidth - cutterWidth * stockDir, -4.3, 3);
        let dowelYPos = yPos + dowelSlot.slotWidth/2 - stockDir*cutterWidth/2;
        for(let k=0; k<dowelSlot.dowels.length; k++){
          let dowelXPos = dowelSlot.xPosition + dowelSlot.dowels[k];
          this.drillAt(dowelXPos, dowelYPos, 5, -5, 7);
        }
        yPos += dowelSlot.stockWidth;
      }
    }
    this.moveTo(0, 0);
  }

  private cutSlot(xPos: number, yPos: number, xLength: number, yLength: number, zStep: number, zCount: number): void{
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

  private drillAt(centerX: number, centerY: number, radius: number, zStep: number, zCount: number){
    this.moveTo(centerX, centerY);
    let cutterWidth = this.cutterWidthControl.value ? this.cutterWidthControl.value : 0;
    let effRadius = radius - cutterWidth/2;
    for(let i=1; i<=zCount; i++){
      this.appendText("\nG01 Z" + (this.zPos + (zStep*i)));
      this.appendText("\nG00 X" + (centerX - effRadius));
      this.appendText("\nG02 X" + (centerX - effRadius) + " Y" + centerY + " I" + effRadius + "J0");
    }
    this.appendText("\nG00 Z" + this.zPos);
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
