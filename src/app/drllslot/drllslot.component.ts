import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { SlotCut } from '../core/SlotCut';
import { Application } from '../core/Application';
import { DowelCut } from '../core/DowelCut';

class Slot {
  public constructor(public x0: number,
  public y0: number,
  public xLength: number,
  public yLength: number,
  public zStep: number,
  public zCount: number){

  }
}

@Component({
  selector: 'app-drllslot',
  standalone: true,
  imports: [
    MatFormField,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule, 
    MatButton
  ],
  templateUrl: './drllslot.component.html',
  styleUrl: './drllslot.component.css'
})
export class DrllslotComponent {
  gcodeTextControl = new FormControl('');
  xDirLengthControl = new FormControl(800);
  yDirLengthControl = new FormControl(12);
  passIterationControl = new FormControl(1);
  zStepPerPassControl = new FormControl(1.0);

  stockLength = 400;
  slotWidth = 12;
  stockWidth = 30;
  stockCount = 1;
  stockPair = true;

  INCH = 25;

  slotLength: number[] = [3*this.INCH, 4*this.INCH];
  slotPositions:number[] = [0, this.stockLength - this.slotLength[1]];
  yOffsets: number[] = [10, this.stockWidth - 10 - this.slotWidth];

  drillXPos: number[] = [this.INCH, 3*this.INCH, this.stockLength - this.INCH, this.stockLength - 3*this.INCH];
  drillRadius = 5;

  public createDrillOffset(): number[]{
    let drillOffset = [];
    for(let i=0; i<this.yOffsets.length; i++){
      drillOffset[i] = this.yOffsets[i] + this.slotWidth/2;
    }
    return drillOffset;
  }

  protected createSlots(): Array<Slot>{
    let slots = new Array<Slot>();
    let xDir = 1;
    let yDir = 1;
    for(let i=0; i<this.stockCount; i++){
      let yPos = i * this.stockWidth * yDir +  this.yOffsets[i%2];
      for(let j=0; j<this.slotPositions.length; j++){
        let xPos = this.slotPositions[j];
        let xLength = this.slotLength[j] * xDir;
        let yLength = this.slotWidth * yDir;
        slots.push(new Slot(xPos, yPos, xLength, yLength, -1, 1));
      }
    }
    return slots;
  }

  public createDrills(){
    let drillYOffset = this.createDrillOffset();
    let app = Application.getInstance();
    for(let i=0; i<this.stockCount; i++){
      let drillYPos = drillYOffset[i%2];
      for(let j=0; j<this.drillXPos.length; j++){
        let dowelCut = new DowelCut(this.drillXPos[j], drillYPos, this.drillRadius, -1, 2);
        app.addComment('Creating drills: [' + i + ', ' + j + ']')
        dowelCut.cut();
        
      }  
    }
  }
  public generateCodes(){
    let slots = this.createSlots();

    let app = Application.getInstance();
    app.setGCodeTextControl(this.gcodeTextControl);

    for(let i=0; i<slots.length; i++){
      let slot = slots[i];
      app.addComment('Creating slot: ' + i);
      let slotCut = new SlotCut(slot.x0, slot.y0, slot.xLength, slot.yLength, slot.zStep, slot.zCount);
      slotCut.cut();
    }

    this.createDrills();
  }
}
