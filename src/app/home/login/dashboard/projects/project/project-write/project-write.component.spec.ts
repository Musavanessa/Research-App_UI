import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWriteComponent } from './project-write.component';

describe('ProjectWriteComponent', () => {
  let component: ProjectWriteComponent;
  let fixture: ComponentFixture<ProjectWriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectWriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
