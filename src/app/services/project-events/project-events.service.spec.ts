import { TestBed } from '@angular/core/testing';

import { ProjectEventsService } from './project-events.service';

describe('ProjectEventsService', () => {
  let service: ProjectEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
