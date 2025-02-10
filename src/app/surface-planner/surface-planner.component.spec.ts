import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfacePlannerComponent } from './surface-planner.component';

describe('SurfacePlannerComponent', () => {
  let component: SurfacePlannerComponent;
  let fixture: ComponentFixture<SurfacePlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurfacePlannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurfacePlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
