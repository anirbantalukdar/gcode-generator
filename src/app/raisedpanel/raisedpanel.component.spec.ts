import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedpanelComponent } from './raisedpanel.component';

describe('RaisedpanelComponent', () => {
  let component: RaisedpanelComponent;
  let fixture: ComponentFixture<RaisedpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaisedpanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RaisedpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
