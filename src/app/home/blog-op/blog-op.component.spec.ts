import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogOpComponent } from './blog-op.component';

describe('BlogOpComponent', () => {
  let component: BlogOpComponent;
  let fixture: ComponentFixture<BlogOpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogOpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
