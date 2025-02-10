import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListHarnessComponent } from './grid-list-harness.component';

describe('GridListHarnessComponent', () => {
  let component: GridListHarnessComponent;
  let fixture: ComponentFixture<GridListHarnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridListHarnessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridListHarnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
