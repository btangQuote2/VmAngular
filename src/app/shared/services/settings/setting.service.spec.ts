import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { SettingService } from './setting.service';
import { HttpModule, XHRBackend, ResponseOptions } from '@angular/http';
import { apiRoutes } from '../../configurations/api-routes.configuration';
import { MockBackend } from '@angular/http/testing';
import { NotificationSearchService } from '../notifications/notification-search.service';
import { HttpTestingController } from '@angular/common/http/testing';

describe('SettingService', () => {
  let service: SettingService;
  let httpMock: HttpTestingController;
  let mockBackend: MockBackend = null;
  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpModule],

      providers: [
        { provide: apiRoutes, useValue: 'https://www.agile1.us/api' },
        SettingService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

    service = TestBed.get(NotificationSearchService);
    httpMock = TestBed.get(HttpTestingController);
    mockBackend = getTestBed().get(MockBackend);

    TestBed.compileComponents();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get()', () => {

    const mockResponse = {
      data:
        { Key: 1, Vale: 'Video 1' }
    };

    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })
        )
      );
    });

    service.get().subscribe(keyValue => {
      expect(keyValue.Key).toEqual('1');
      expect(keyValue.Value).toEqual('Video 1');
    });
  });
});
