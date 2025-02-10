import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillHoleComponent } from './drill-hole.component';

describe('DrillHoleComponent', () => {
  let component: DrillHoleComponent;
  let fixture: ComponentFixture<DrillHoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrillHoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrillHoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
