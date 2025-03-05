import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface Stock {
  position: number;

  breadth: number;
  
  dowels: number[];
  
  tenonStart: number;
  tenonEnd: number;

  tenonWidth: number;
}
@Component({
  selector: 'app-tenondowell',
  standalone: true,
  imports: [
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule
  ],
  templateUrl: './tenondowell.component.html',
  styleUrl: './tenondowell.component.css'
})
export class TenondowellComponent {
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
  cutterWidth = 6;
  stocks : Stock[] = [
    {  
      position: 0,
      breadth: 90,
      dowels: [-25, -75],
      tenonStart: -10,
      tenonEnd: -85,
      tenonWidth: 12
    },
    {  
      position: -150,
      breadth: 90,
      dowels: [-25, -75],
      tenonStart: -10,
      tenonEnd: -85,
      tenonWidth: 12
    },
    {  
      position: -305,
      breadth: 90,
      dowels: [-25, -75],
      tenonStart: -10,
      tenonEnd: -85,
      tenonWidth: 12
    },
    {  
      position: -360,
      breadth: -90,
      dowels: [-25, -75],
      tenonStart: -10,
      tenonEnd: -85,
      tenonWidth: 12
    },
  ];

  public generateCodes(){
    this.gcodeTextControl.setValue("");
    let width: number = 36;
    let cutterWdth : number = 6;
    //moveTo(width/2, 0);
    
    // drill the dowells first.
    for(let i=0; i<this.stocks.length; i++){
      let stock = this.stocks[i];
      //this.cutSlot(0, stock.position, width, stock.tenonStart-cutterWdth/2, -1, 1);
      for(let j=0; j<stock.dowels.length; j++){
       // this.drillAt(width/2.0, stock.position + stock.dowels[j], 5, -1, 1);
      }
      //this.cutSlot(0, stock.position + stock.tenonEnd, width, stock.breadth - stock.tenonEnd, -1, 1);  
      this.cutSlot(0, stock.position, (width-stock.tenonWidth)/2, -stock.breadth, -1, 1);
      //this.cutSlot(width/2+stock.tenonWidth/2, stock.position, (width-stock.tenonWidth)/2, -stock.breadth, -1, 1);   
    }
    this.moveTo(0, 0);
  }

  private cutSlot(xPos: number, yPos: number, xLength: number, yLength: number, zStep: number, zCount: number): void{
    let xDir = xLength/Math.abs(xLength);
    let yDir = yLength/Math.abs(yLength);
    xPos = xPos + xDir * this.cutterWidth/2;
    yPos = yPos + yDir * this.cutterWidth/2;
    this.moveTo(xPos, yPos);

    let z = this.zPos;
    for(let i=0; i<zCount; i++){
      z = z + zStep;
      this.appendText("\nG01 Z" + z + " F900");
      this.appendText("\nG01 X" + (xPos + xLength-this.cutterWidth*xDir));
      this.appendText("\nG01 Y" + (yPos + yLength-this.cutterWidth*yDir));
      this.appendText("\nG01 X" + xPos);
      this.appendText("\nG01 Y" + yPos);
    }
    this.appendText("\nG00 Z" + this.zPos);
    this.appendText("\n\n")
  }

  private drillAt(centerX: number, centerY: number, radius: number, zStep: number, zCount: number){
    this.moveTo(centerX, centerY);
    let cutterWidth = this.cutterWidthControl.value ? this.cutterWidthControl.value : 6;
    let effRadius = radius - cutterWidth/2;
    for(let i=1; i<=zCount; i++){
      this.appendText("\nG01 Z" + (this.zPos + (zStep*i)));
      this.appendText("\nG00 X" + (centerX - effRadius));
      this.appendText("\nG02 X" + (centerX - effRadius) + " Y" + centerY + " I" + effRadius + "J0");
    }
    this.appendText("\nG00 Z" + this.zPos);
    this.appendText("\n\n");
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
