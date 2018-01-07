import { TestBed, inject } from '@angular/core/testing';

import { TenantConfigurationService } from './tenant-configuration.service';

describe('TenantConfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenantConfigurationService]
    });
  });

  it('should be created', inject([TenantConfigurationService], (service: TenantConfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
