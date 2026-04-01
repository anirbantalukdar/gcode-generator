import { FormControl } from "@angular/forms";

export class Application {
    private static m_Application: Application = new Application();

    private Application(){

    }

    public static getInstance(): Application{
        return this.m_Application;
    }

    public getCutterWidth(): number{
        return this.m_CutterWidth;
    }

    public setCutterWidth(cutterWidth: number): void {
        this.m_CutterWidth = cutterWidth;
    }

    public setFeedRate(feedRate: number): void {
        this.m_FeedRate = feedRate;
        this.m_XFeedRate = this.m_YFeedRate = this.m_ZFeedRate = feedRate;
    }

    public setXFeedRate(xFeedRate: number): void {
        this.m_XFeedRate = xFeedRate;
    }

    public setYFeedRate(yFeedRate: number): void {
        this.m_YFeedRate = yFeedRate;
    }

    public setZFeedRate(zFeedRate: number): void {
        this.m_ZFeedRate = zFeedRate;
    }

    public getXFeedRate(): number {
        return this.m_XFeedRate;
    }

    public getYFeedRate(): number {
        return this.m_YFeedRate;
    }

    public getZFeedRate(): number {
        return this.m_XFeedRate;
    }

    public getFeedRate(): number {
        return this.m_FeedRate;
    }

    public setScale(scale: number): void{
        this.m_Scale = scale;
        this.m_xScale = this.m_yScale = this.m_zScale = scale;
    }

    public setXScale(xScale: number): void{
        this.m_xScale = xScale;
    }

    public setYScale(yScale: number): void{
        this.m_yScale = yScale;
    }

    public setZScale(zScale: number): void{
        this.m_zScale = zScale;
    }

    public getXScale(): number{
        return this.m_xScale;
    }

    public getYScale(): number{
        return this.m_yScale;
    }

    public getZScale(): number{
        return this.m_zScale;
    }

    public setGCodeTextControl(textControl: FormControl){
        this.m_GCodeTextControl = textControl;
    }

    public appendText(text: String){
        this.m_GCodeTextControl.setValue(this.m_GCodeTextControl.value + text);
    }

    public safeMoveTo(xPos: number, yPos: number){
//        this.appendText("\nG01 Z" + this.m_SafeZ + "F" + this.m_ZFeedRate);
        this.appendText("\nG01 Z" + this.m_SafeZ);
//        this.appendText("\nG01 X" + xPos + "F" + this.m_XFeedRate +  "Y" + yPos+"F" + this.m_YFeedRate);
        this.appendText("\nG01 X" + xPos + " Y" + yPos);
//        this.appendText("\nG01 Z" + this.m_ZPos + "F" + this.m_ZFeedRate);
        this.appendText("\nG01 Z " + this.m_ZPos);
        this.m_XPos = xPos;
        this.m_YPos = yPos;
    }
    

    public absoluteMoveTo(xPos: number, yPos: number){
        //this.appendText("\nG01 X" + xPos + "F" + this.m_XFeedRate +  "Y" + yPos+"F" + this.m_YFeedRate);
        this.appendText("\nG01 X" + xPos + " Y" + yPos);
        this.m_XPos = xPos;
        this.m_YPos = yPos;
    }

    public moveZTo(zPos: number){
        //this.appendText("\nG01 Z" + zPos + " F" + this.m_ZFeedRate);
        this.appendText("\nG01 Z" + zPos);// + " F" + this.m_ZFeedRate);
        this.m_ZPos = zPos;
    }

    public circleAt(centerX: number, centerY: number, radius: number){
        this.safeMoveTo(centerX, centerY);
        let effRadius = radius - this.m_CutterWidth/2;
        this.positionZ();
        this.appendText("\nG01 X" + (centerX - effRadius));
        this.appendText("\nG02 X" + (centerX - effRadius) + " Y" + centerY + " I" + effRadius + "J0");
    }

    public absoluteCircleAt(centerX: number, centerY: number, radius: number){
        let effRadius = radius - this.m_CutterWidth/2;
        this.appendText("\nG01 X" + (centerX - effRadius));
        this.appendText("\nG02 X" + (centerX - effRadius) + " Y" + centerY + " I" + effRadius + "J0");
    }

    public safeCutRect(x0: number, y0: number, x1: number, y1: number){
        this.safeMoveTo(x0, y0);
        this.positionZ();
        this.absoluteMoveTo(x1, y0);
        this.absoluteMoveTo(x1, y1);
        this.absoluteMoveTo(x0, y1);
        this.absoluteMoveTo(x0, y0);
    }

    public safeCutStraight(x0: number, y0: number, x1: number, y1: number){
        if(this.m_XPos == x0 && this.m_YPos == y0){
            this.positionZ();
            this.absoluteMoveTo(x1, y1);
            return;
        }
        if(this.m_XPos == x1 && this.m_YPos == y1){
            this.positionZ();
            this.absoluteMoveTo(x0, y0);
            return;
        }
        this.safeMoveTo(x0, y0);
        this.absoluteMoveTo(x1, y1);
    }

    public getZPos(): number {
        return this.m_ZPos;
    }

    public setZPos(zPos: number){
        this.m_ZPos = zPos;
    }
    
    public positionZ(){
        this.moveZTo(this.m_ZPos);
    }


    public addComment(line: String){
        this.appendText('\n\n;' + line);
    }
    private m_GCodeTextControl : FormControl;
    private m_CutterWidth = 6.0;
    private m_SafeZ: number = 5.0;
    private m_ZPos: number = 0.0;
    private m_XPos: number = 0.0;
    private m_YPos: number = 0.0;
    private m_FeedRate: number = 400;
    private m_XFeedRate: number = this.m_FeedRate;
    private m_YFeedRate: number = this.m_FeedRate;
    private m_ZFeedRate: number = this.m_FeedRate;

    private m_Scale: number = 1;
    private m_xScale: number = 1;
    private m_yScale: number = 1;
    private m_zScale: number = 1;
}