import { Application } from "./Application";
import { DepthCut } from "./DepthCut";

export class SlotCut extends DepthCut {
  public constructor(protected x0: number, 
    protected y0: number, 
    protected xLength: number, 
    protected yLength: number, 
    protected zStep: number, 
    protected zCount: number){
    super();
  }

  public override cut(): void {
    let app = Application.getInstance();
    let zPos = app.getZPos();
    for(let i=1; i<=this.zCount; i++){
      app.setZPos(this.zStep*i);
      this.cutRect(this.x0, this.y0, this.xLength, this.yLength);
    }
    app.moveZTo(zPos);
  }

  public cutRect(x0: number, y0: number, xLength: number, yLength: number){
      let app = Application.getInstance();
      let cutterWidth = app.getCutterWidth();
      let sx = app.getXScale();
      let sy = app.getYScale();
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
          app.safeCutStraight(x0Pos*sx, y0Pos*sy, x1Pos*sx, y1Pos*sy);
        }else {
          app.safeCutRect(x0Pos*sx, y0Pos*sy, x1Pos*sx, y1Pos*sy);
        }
        xLen -= 2*cutterWidth;
        yLen -= 2*cutterWidth;

      }while(xLen > 0 && yLen > 0);
  }
}