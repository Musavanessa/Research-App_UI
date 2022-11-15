import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInnerHeaderComponent } from './project-inner-header.component';

describe('ProjectInnerHeaderComponent', () => {
  let component: ProjectInnerHeaderComponent;
  let fixture: ComponentFixture<ProjectInnerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInnerHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInnerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
