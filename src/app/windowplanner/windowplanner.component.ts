import { Component } from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-windowplanner',
  standalone: true,
  imports: [MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule, MatButton],
  templateUrl: './windowplanner.component.html',
  styleUrl: './windowplanner.component.css'
})
export class WindowplannerComponent {
  cutterWidthControl = new FormControl(75);
  gcodeTextControl = new FormControl('');
  xDirLengthControl = new FormControl(1118);
  xScaleControl = new FormControl(4.0);
  yScaleControl = new FormControl(1.0);
  yDirLengthControl = new FormControl(407);
  passIterationControl = new FormControl(1);
  zStepPerPassControl = new FormControl(1.0);

  protected safeZ = 0;
  protected zPos = 0;
  public generateCodes(){
    this.gcodeTextControl.setValue('');
    let cutterWidth = this.cutterWidthControl.value;
    let xScale = this.xScaleControl.value;
    let yScale = this.yScaleControl.value;
    let xDir = this.xDirLengthControl.value/Math.abs(this.xDirLengthControl.value);
    let yDir = this.yDirLengthControl.value/Math.abs(this.yDirLengthControl.value);
    let passIterationCount = this.passIterationControl.value;
    let zValuePerIteration = this.zStepPerPassControl.value;
    let xLength = Math.abs(this.xDirLengthControl.value);
    let yLength = Math.abs(this.yDirLengthControl.value);
    
    for(let i=0; i<passIterationCount; i++){
      this.zPos += zValuePerIteration;
      this.safeZ = this.zPos;
      let x0 = 0;
      let y0 = 0;
      let x1 = x0 + xDir * (xLength - cutterWidth)/xScale;
      let y1 = y0 + yDir * (yLength - cutterWidth)/yScale;
      this.cutRect(x0, y0, x1, y1);

      x0 += xDir * cutterWidth/xScale;
      y0 += yDir * cutterWidth/yScale;
      x1 = x0 + xDir * (xLength - 3.0 * cutterWidth)/xScale;
      y1 = y0 + yDir * (yLength - 3.0 * cutterWidth)/yScale;
      this.cutTo(x0, y0);
      this.cutRect(x0, y0, x1, y1);

      this.moveTo(0, 0);
    }
    this.zPos = 0;
    this.moveTo(0, 0);
  }

  public moveTo(xPos: number, yPos: number){
    this.appendText("\nG00 Z" + this.safeZ);
    this.appendText("\nG00 X" + xPos + " Y" + yPos);
    this.appendText("\nG00 Z" + this.zPos);
  }

  protected cutTo(xPos: number, yPos: number){
    this.appendText("\nG00 X" + xPos + " Y" + yPos);
  }

  protected cutRect(x0: number, y0: number, x1: number, y1: number){
    this.moveTo(x0, y0);
    this.cutTo(x1, y0);
    this.cutTo(x1, y1);
    this.cutTo(x0, y1);
    this.cutTo(x0, y0);
  }

  appendText(text: string){
    this.gcodeTextControl.setValue(this.gcodeTextControl.value + text);
  }

}
