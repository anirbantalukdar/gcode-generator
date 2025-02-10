import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListDynamicComponent } from './grid-list-dynamic.component';

describe('GridListDynamicComponent', () => {
  let component: GridListDynamicComponent;
  let fixture: ComponentFixture<GridListDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridListDynamicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridListDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
