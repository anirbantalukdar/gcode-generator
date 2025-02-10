import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxJointComponent } from './box-joint.component';

describe('BoxJointComponent', () => {
  let component: BoxJointComponent;
  let fixture: ComponentFixture<BoxJointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxJointComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxJointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
