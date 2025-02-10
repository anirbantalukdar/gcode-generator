import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionCollapseAllComponent } from './expansion-collapse-all.component';

describe('ExpansionCollapseAllComponent', () => {
  let component: ExpansionCollapseAllComponent;
  let fixture: ComponentFixture<ExpansionCollapseAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpansionCollapseAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpansionCollapseAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
