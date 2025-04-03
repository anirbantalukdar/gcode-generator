
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
  templateUrl: './raisedpanel.component.html',
  styleUrl: './raisedpanel.component.css'
})
export class RaisedpanelComponent {
  xPositionControl = new FormControl(0);
  yPositionControl = new FormControl(0);
  cutterWidthControl = new FormControl(5.75);
  xDirLengthControl = new FormControl(0);
  yDirLengthControl = new FormControl(0);
  zDepthControl = new FormControl(12);
  zStepControl = new FormControl(3);
  gcodeTextControl = new FormControl();
  safeZ = 40;
  zPos = 0;

  public generateCodes(){
    // TODO validation checking is a must  here
    let cutterWidth : number = this.cutterWidthControl.value ? this.cutterWidthControl.value : 5.75;
    let xDirLength : number = this.xDirLengthControl.value ? this.xDirLengthControl.value : 0;
    let yDirLength : number = this.yDirLengthControl.value ? this.yDirLengthControl.value : 0;
    let zDepth : number = this.zDepthControl.value ? this.zDepthControl.value : 0;
    let zStep : number = this.zStepControl.value ? this.zStepControl.value : 0;
    let stockCount = 2;

    let INCH = 25.4;
    let stockWidth = -57.5/2;
    let stockLength = INCH*43.4;
    let slotWidth = 13;
    this.gcodeTextControl.setValue('');


    let zDepths = [];
    
    let xLength = 815;
    let yLength = 535;
    cutterWidth = 12;    
    let raisedEdge = 36;
    let raisedDepth = 

    this.moveTo(0, 0);
  }

  private cutRect(xPos: number, yPos: number, xLength: number, yLength: number): void{
      this.appendText("\nG01 X" + (xPos + xLength));
      this.appendText("\nG01 Y" + (yPos + yLength));
      this.appendText("\nG01 X" + xPos);
      this.appendText("\nG01 Y" + yPos);
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
