import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInnerHeaderComponent } from './new-inner-header.component';

describe('NewInnerHeaderComponent', () => {
  let component: NewInnerHeaderComponent;
  let fixture: ComponentFixture<NewInnerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewInnerHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInnerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
