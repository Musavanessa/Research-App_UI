import { TestBed } from '@angular/core/testing';

import { GoalFilesService } from './goal-files.service';

describe('GoalFilesService', () => {
  let service: GoalFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
