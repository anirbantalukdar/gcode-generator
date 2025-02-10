import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionOverviewComponent } from './expansion-overview.component';

describe('ExpansionOverviewComponent', () => {
  let component: ExpansionOverviewComponent;
  let fixture: ComponentFixture<ExpansionOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpansionOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpansionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
