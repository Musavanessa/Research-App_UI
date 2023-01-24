import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSupervisorsComponent } from './update-supervisors.component';

describe('UpdateSupervisorsComponent', () => {
  let component: UpdateSupervisorsComponent;
  let fixture: ComponentFixture<UpdateSupervisorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSupervisorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSupervisorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
