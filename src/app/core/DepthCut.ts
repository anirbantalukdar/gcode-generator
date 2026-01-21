import { FormControl } from "@angular/forms";
import { Application } from "./Application";

export abstract class DepthCut {
    protected constructor(zStep = 5.0, zCount = 1){
        this.m_ZCount = zCount;
        this.m_ZStep = zStep;
    }   

    public abstract cut(): void;

    protected m_ZStep: number;
    protected m_ZCount: number;
}