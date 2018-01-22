import { TestBed, inject } from '@angular/core/testing';

import { NotificationSearchService } from './notification-search.service';

describe('NotificationSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationSearchService]
    });
  });

  it('should be created', inject([NotificationSearchService], (service: NotificationSearchService) => {
    expect(service).toBeTruthy();
  }));
});
