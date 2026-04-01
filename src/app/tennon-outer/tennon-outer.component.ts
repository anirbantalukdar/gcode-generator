import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInput, MatInputModule } from '@angular/material/input';
import { Application } from '../core/Application';

@Component({
  selector: 'app-tennon-outer',
  standalone: true,
  imports: [
    MatFormField, 
    MatFormFieldModule,
    MatLabel, 
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButton
  ],
  templateUrl: './tennon-outer.component.html',
  styleUrl: './tennon-outer.component.css'
})
export class TennonOuterComponent {
  xOffsetControl = new FormControl(0);
  yOffsetControl = new FormControl(0);
  
  stockCountControl = new FormControl(1);

  cutterWidthControl = new FormControl(8);
  
  stockWidthControl = new FormControl(50);
  stockBreadthControl = new FormControl(50);
  tennonWidthControl = new FormControl(30);
  tennonBreadthControl = new FormControl(12);

  zStepControl = new FormControl(50);
  zCountControl = new FormControl(50);
  gcodeTextControl = new FormControl('');

  public generateCodes(){
    this.gcodeTextControl.setValue('');
    let cutterWidth = this.cutterWidthControl.value;
    let stockWidth = this.stockWidthControl.value;
    let stockBreadth = this.stockBreadthControl.value;
    let tennonWidth = this.tennonWidthControl.value;
    let tennonBreadth = this.tennonBreadthControl.value;

    tennonBreadth = tennonBreadth - cutterWidth;

    let xPos = (stockWidth - tennonWidth)/2.0;
    let yPos = (stockBreadth - tennonBreadth)/2.0;

    
    this.cutSlot(xPos, yPos, tennonWidth, tennonBreadth);

  }

  cutSlot(xPos: number, yPos: number, width: number, breadth: number){
    let app = Application.getInstance();
    this.moveTo(xPos, yPos);
    this.cutTo(xPos + width, yPos);
    xPos = xPos + width;

    let circleRadius = breadth/2.0;
    let arcEndX = xPos;
    let arcEndY = yPos + breadth;
    let centerX = xPos;
    let centerY = yPos + breadth/2.0;
    this.arcTo(xPos, yPos, arcEndX, arcEndY, arcEndX - centerX, arcEndY-centerY);
    yPos = arcEndY;
    this.cutTo(xPos-width, yPos);

    xPos -= width;
    
    arcEndX = xPos;
    arcEndY = yPos - breadth;
    centerX = xPos;
    centerY = yPos - breadth/2.0;
    this.arcTo(xPos, yPos, arcEndX, arcEndY, arcEndX-centerX, arcEndY-centerY);    
  }

  arcTo(startX: number, startY: number, endX: number, endY: number, centerOffsetX: number, centerOffsetY: number){
    this.cutTo(startX, startY);
    this.appendText("\nG03 X" + endX + "Y" + endY + "I"+centerOffsetX+"J"+centerOffsetY);
  }

    public moveTo(xPos: number, yPos: number){
    this.appendText("\nG00 X" + xPos + " Y" + yPos);
  }

  protected cutTo(xPos: number, yPos: number){
    this.appendText("\nG01 X" + xPos + " Y" + yPos);
  }


  appendText(text: string){
    this.gcodeTextControl.setValue(this.gcodeTextControl.value + text);
  }

}
