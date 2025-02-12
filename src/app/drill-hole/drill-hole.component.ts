import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-drill-hole',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './drill-hole.component.html',
  styleUrl: './drill-hole.component.css'
})
export class DrillHoleComponent {
  cutterWidthControl = new FormControl(6);
  gcodeTextControl = new FormControl('');
  safeZ = 40;
  zPos = 0;

  public generateCodes(){
    this.gcodeTextControl.setValue('');
    let stockWidth = -30;
    let stockCount = 8;
    let cutterWidth = this.cutterWidthControl.value ? this.cutterWidthControl.value : 6;
    let stockDir = stockWidth/Math.abs(stockWidth); 
    let xPos = 0;
    let yPos = stockWidth/2 + stockDir * cutterWidth/2;
    let xPositions : Array<number> = [25, 75]
    for(let i=0; i<stockCount; i++){
      for(let j=0; j<xPositions.length; j++){
        xPos = xPositions[j];
        this.drillAt(xPos, yPos, 5, -5, 7);
        this.appendText("\n\n");
      }
      yPos += stockWidth;
    }
    this.moveTo(0, 0);
  }

  public moveTo(xPos: number, yPos: number){
    this.appendText("\nG00 Z" + this.safeZ + " F500");
    this.appendText("\nG00 X" + xPos + " Y" + yPos);
    this.appendText("\nG01 Z" + this.zPos);
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
  private appendText(text: string){
    this.gcodeTextControl.setValue(this.gcodeTextControl.value + text);
  }
}
