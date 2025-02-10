import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionStateComponent } from './expansion-state.component';

describe('ExpansionStateComponent', () => {
  let component: ExpansionStateComponent;
  let fixture: ComponentFixture<ExpansionStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpansionStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpansionStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
