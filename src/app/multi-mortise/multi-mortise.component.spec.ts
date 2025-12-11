import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiMortiseComponent } from './multi-mortise.component';

describe('MultiMortiseComponent', () => {
  let component: MultiMortiseComponent;
  let fixture: ComponentFixture<MultiMortiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiMortiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiMortiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
