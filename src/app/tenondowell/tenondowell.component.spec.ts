import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenondowellComponent } from './tenondowell.component';

describe('TenondowellComponent', () => {
  let component: TenondowellComponent;
  let fixture: ComponentFixture<TenondowellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenondowellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TenondowellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
