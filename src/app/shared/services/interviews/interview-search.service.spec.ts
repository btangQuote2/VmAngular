import { TestBed, inject } from '@angular/core/testing';

import { InterviewSearchService } from './interview-search.service';

describe('InterviewSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterviewSearchService]
    });
  });

  it('should be created', inject([InterviewSearchService], (service: InterviewSearchService) => {
    expect(service).toBeTruthy();
  }));
});
