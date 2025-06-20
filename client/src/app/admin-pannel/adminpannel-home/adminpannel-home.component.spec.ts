import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpannelHomeComponent } from './adminpannel-home.component';

describe('AdminpannelHomeComponent', () => {
  let component: AdminpannelHomeComponent;
  let fixture: ComponentFixture<AdminpannelHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminpannelHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminpannelHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
