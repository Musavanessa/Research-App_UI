import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdnLoginComponent } from './rdn-login.component';

describe('RdnLoginComponent', () => {
  let component: RdnLoginComponent;
  let fixture: ComponentFixture<RdnLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdnLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdnLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
