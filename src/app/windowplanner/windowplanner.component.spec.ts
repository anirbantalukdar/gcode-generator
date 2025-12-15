import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowplannerComponent } from './windowplanner.component';

describe('WindowplannerComponent', () => {
  let component: WindowplannerComponent;
  let fixture: ComponentFixture<WindowplannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowplannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WindowplannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
