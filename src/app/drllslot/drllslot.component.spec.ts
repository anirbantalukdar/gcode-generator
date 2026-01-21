import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrllslotComponent } from './drllslot.component';

describe('DrllslotComponent', () => {
  let component: DrllslotComponent;
  let fixture: ComponentFixture<DrllslotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrllslotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrllslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
