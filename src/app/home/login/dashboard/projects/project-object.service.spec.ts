import { TestBed } from '@angular/core/testing';

import { ProjectObjectService } from './project-object.service';

describe('ProjectObjectService', () => {
  let service: ProjectObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
