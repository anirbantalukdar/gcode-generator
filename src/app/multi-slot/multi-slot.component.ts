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
  cutterWidthControl = new FormControl(5.75);
  xDirLengthControl = new FormControl(0);
  yDirLengthControl = new FormControl(0);
  zDepthControl = new FormControl(12);
  zStepControl = new FormControl(3);
  gcodeTextControl = new FormControl();
  safeZ = 5;
  zPos = 0;

  public generateCodes(){
    // TODO validation checking is a must  here
    let cutterWidth : number = this.cutterWidthControl.value ? this.cutterWidthControl.value : 6;
    let xDirLength : number = this.xDirLengthControl.value ? this.xDirLengthControl.value : 0;
    let yDirLength : number = this.yDirLengthControl.value ? this.yDirLengthControl.value : 0;
    let zDepth : number = this.zDepthControl.value ? this.zDepthControl.value : 0;
    let zStep : number = this.zStepControl.value ? this.zStepControl.value : 0;
    let stockCount = 2;

    let stockWidth = 63.3/2;
    let slotWidth = 13.5;
    this.gcodeTextControl.setValue('');

    let dowelSlots = new Array<DowelSlot>();

    let dowelSlot = new DowelSlot(0, stockWidth, slotWidth, 25.4*3.5);
    dowelSlot.addDowels([25.4, 75.8]);

    dowelSlots.push(dowelSlot);
    
    let yPos = 0;

    let yDir = stockWidth/Math.abs(stockWidth);
    let slotOffset = 10;
    for(let i=0; i < dowelSlots.length; i++){
      let dowelSlot = dowelSlots[i];
      for(let j=0; j<stockCount; j++){
        let dowelYPos = yPos + slotOffset + yDir * slotWidth/2;
        for(let k=0; k<dowelSlot.dowels.length; k++){
          let dowelXPos = dowelSlot.xPosition + dowelSlot.dowels[k];
          console.log('drill at: ', dowelXPos, dowelYPos);
          this.drillAt(dowelXPos, dowelYPos, 5, -2.9, 13);
        }
        let slotYPos = dowelYPos + yDir * cutterWidth/2 - yDir * slotWidth/2
        // cut the slot
        console.log('cutting slot: ', dowelSlot.xPosition, slotYPos, dowelSlot.slotLength, yDir*dowelSlot.slotWidth-yDir*cutterWidth);
        this.cutSlot(dowelSlot.xPosition, slotYPos, dowelSlot.slotLength, yDir*dowelSlot.slotWidth-yDir*cutterWidth, -3.4, 4);
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
      this.appendText("\nG01 Z" + (this.zPos + (zStep*i)) + " F500");
      this.appendText("\nG01 X" + (centerX - effRadius));
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
