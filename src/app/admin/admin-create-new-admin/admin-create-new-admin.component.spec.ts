import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateNewAdminComponent } from './admin-create-new-admin.component';

describe('AdminCreateNewAdminComponent', () => {
  let component: AdminCreateNewAdminComponent;
  let fixture: ComponentFixture<AdminCreateNewAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateNewAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateNewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
