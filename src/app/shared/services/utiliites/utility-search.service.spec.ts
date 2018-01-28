import { TestBed, inject } from '@angular/core/testing';

import { UtilitySearchService } from './utility-search.service';

describe('UtilitySearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilitySearchService]
    });
  });

  it('should be created', inject([UtilitySearchService], (service: UtilitySearchService) => {
    expect(service).toBeTruthy();
  }));
});
