import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnernavComponent } from './innernav.component';

describe('InnernavComponent', () => {
  let component: InnernavComponent;
  let fixture: ComponentFixture<InnernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnernavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
