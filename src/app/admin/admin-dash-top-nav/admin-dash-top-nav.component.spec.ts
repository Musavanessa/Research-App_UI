import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashTopNavComponent } from './admin-dash-top-nav.component';

describe('AdminDashTopNavComponent', () => {
  let component: AdminDashTopNavComponent;
  let fixture: ComponentFixture<AdminDashTopNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashTopNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
