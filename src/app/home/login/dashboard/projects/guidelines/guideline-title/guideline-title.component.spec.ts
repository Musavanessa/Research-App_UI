import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelineTitleComponent } from './guideline-title.component';

describe('GuidelineTitleComponent', () => {
  let component: GuidelineTitleComponent;
  let fixture: ComponentFixture<GuidelineTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuidelineTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidelineTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
