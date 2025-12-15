import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowrabbetcutComponent } from './windowrabbetcut.component';

describe('WindowrabbetcutComponent', () => {
  let component: WindowrabbetcutComponent;
  let fixture: ComponentFixture<WindowrabbetcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowrabbetcutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WindowrabbetcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
