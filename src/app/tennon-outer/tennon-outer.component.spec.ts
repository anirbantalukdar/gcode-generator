import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TennonOuterComponent } from './tennon-outer.component';

describe('TennonOuterComponent', () => {
  let component: TennonOuterComponent;
  let fixture: ComponentFixture<TennonOuterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TennonOuterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TennonOuterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
