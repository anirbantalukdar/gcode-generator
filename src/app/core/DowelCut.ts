import { Application } from "./Application";
import { DepthCut } from "./DepthCut";

export class DowelCut extends DepthCut{
    protected m_XPos: number;
    protected m_YPos: number;
    protected m_Radius: number;

    public constructor(protected xPos: number, protected yPos: number, radius: number, protected zStep: number, protected zCount: number){
        super(zStep, zCount);
        this.m_XPos = xPos;
        this.m_YPos = yPos;
        this.m_Radius = radius;
    }

    public override cut(): void {
        let app = Application.getInstance();
        let cutterWidth = app.getCutterWidth();
        app.safeMoveTo(this.m_XPos, this.m_YPos);
        app.addComment('End safe move to');
        for(let i=1; i<=this.m_ZCount; i++){
            app.addComment('MoveZTo');
            app.moveZTo(i * this.m_ZStep);
            app.addComment('MoveZTo');
            app.moveZTo(0);
        }
        this.fixDrillRadius();
        app.absoluteMoveTo(this.m_XPos, this.m_YPos);
    }

  private fixDrillRadius(){
    let app = Application.getInstance();
    for(let i=1; i<=this.m_ZCount; i++){
        app.moveZTo(this.m_ZStep * i);
        app.absoluteCircleAt(this.xPos, this.yPos, this.m_Radius);
    }
    app.moveZTo(0);
  }
}
