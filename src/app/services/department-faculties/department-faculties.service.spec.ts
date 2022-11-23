import { TestBed } from '@angular/core/testing';

import { DepartmentFacultiesService } from './department-faculties.service';

describe('DepartmentFacultiesService', () => {
  let service: DepartmentFacultiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentFacultiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
