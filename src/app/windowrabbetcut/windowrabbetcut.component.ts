import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';

class Rect {
  public constructor(public x0: number, public y0: number, public xLength: number, public yLength: number){

  }

  public scaleBy(sx: number, sy: number): Rect{
    this.x0 *= sx;
    this.y0 *= sy;
    this.xLength *= sx;
    this.yLength *= sy;
    return this;
  }
}

@Component({
  selector: 'app-windowrabbetcut',
  standalone: true,
  imports: [
    MatFormField,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule, 
    MatButton
  ],
  templateUrl: './windowrabbetcut.component.html',
  styleUrl: './windowrabbetcut.component.css'
})
export class WindowrabbetcutComponent {
  cutterWidthControl = new FormControl(12);
  gcodeTextControl = new FormControl('');
  xDirLengthControl = new FormControl(890);
  xScaleControl = new FormControl(4.0);
  yScaleControl = new FormControl(2.0);
  yDirLengthControl = new FormControl(220);
  passIterationControl = new FormControl(1);
  zStepPerPassControl = new FormControl(1.0);

  safeZ = 5;
  zPos = 0;

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
    let curveOffset = 50;
    let rect1 = new Rect(-12*xDir, -12*yDir, xDir * (xLength + curveOffset+12), 12*yDir);
    let rect2 = new Rect(xLength * xDir, -12*yDir, xDir * curveOffset, (yLength + 24) * yDir);
    let rect3 = new Rect(xDir * (xLength+ curveOffset), yDir*yLength, -xDir*(curveOffset+xLength+12), yDir*12);
    let rect4 = new Rect(-12*xDir, yDir*(12+yLength), 12*xDir, -yDir*(24+yLength));
    //rect1.scaleBy(1/xScale, 1/yScale);
    //rect2.scaleBy(1/xScale, 1/yScale);
    //rect3.scaleBy(1/xScale, 1/yScale);
    //rect4.scaleBy(1/xScale, 1/yScale);
    //console.log(rect1, rect2, rect3, rect4);
    console.log(rect1);
    console.log(rect2);
    console.log(rect3);
    console.log(rect4);
    let sx = 1/xScale;
    let sy = 1/yScale;
    for(let i=0; i<passIterationCount; i++){
      this.zPos += zValuePerIteration;
      this.cutRect(rect1.x0, rect1.y0, rect1.xLength, rect1.yLength, cutterWidth, sx, sy);
      this.cutRect(rect2.x0, rect2.y0, rect2.xLength, rect2.yLength, cutterWidth, sx, sy);
      this.cutRect(rect3.x0, rect3.y0, rect3.xLength, rect3.yLength, cutterWidth, sx, sy);
      this.cutRect(rect4.x0, rect4.y0, rect4.xLength, rect4.yLength, cutterWidth, sx, sy);
    }
    this.zPos = 0;
    this.moveTo(0, 0);

  }


  public cutRect(x0: number, y0: number, xLength: number, yLength: number, cutterWidth: number, sx: number, sy:number){
      let xDir = xLength/Math.abs(xLength);
      let yDir = yLength/Math.abs(yLength);
      let xLen = Math.abs(xLength);
      let yLen = Math.abs(yLength);
  
      let x0Pos = x0;
      let y0Pos = y0;
      x0Pos -= xDir * cutterWidth/2.0;
      y0Pos -= yDir * cutterWidth/2.0;
      if(xLen < cutterWidth || yLen < cutterWidth){
          return;
      }

      do {
        x0Pos += xDir * cutterWidth;
        y0Pos += yDir * cutterWidth;
        let x1Pos = x0Pos + xDir * (xLen - cutterWidth);
        let y1Pos = y0Pos + yDir * (yLen - cutterWidth);
       if(xLen <= cutterWidth || yLen <= cutterWidth){
          this.moveTo(x0Pos*sx, y0Pos*sy);
          this.cutTo(x1Pos*sx, y1Pos*sy);
        }else {
          this.cutRectGCode(x0Pos*sx, y0Pos*sy, x1Pos*sx, y1Pos*sy);
        }
        xLen -= 2*cutterWidth;
        yLen -= 2*cutterWidth;

      }while(xLen > 0 && yLen > 0);
  }

  protected cutRectGCode(x0: number, y0: number, x1: number, y1: number){
    this.moveTo(x0, y0);
    this.cutTo(x1, y0);
    this.cutTo(x1, y1);
    this.cutTo(x0, y1);
    this.cutTo(x0, y0);
  }



  public moveTo(xPos: number, yPos: number){
    this.appendText("\nG00 Z" + this.safeZ);
    this.appendText("\nG00 X" + xPos + " Y" + yPos);
    this.appendText("\nG00 Z" + this.zPos);
  }

  protected cutTo(xPos: number, yPos: number){
    this.appendText("\nG00 X" + xPos + " Y" + yPos);
  }


  appendText(text: string){
    this.gcodeTextControl.setValue(this.gcodeTextControl.value + text);
  }
}
