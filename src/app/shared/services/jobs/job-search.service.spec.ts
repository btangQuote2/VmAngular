import { TestBed, inject } from '@angular/core/testing';

import { JobSearchService } from './job-search.service';

describe('JobSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobSearchService]
    });
  });

  it('should be created', inject([JobSearchService], (service: JobSearchService) => {
    expect(service).toBeTruthy();
  }));
});
