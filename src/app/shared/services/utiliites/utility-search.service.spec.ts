import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { UtilityService } from './utility-search.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, XHRBackend, ResponseOptions } from '@angular/http';
import { apiRoutes } from '../../configurations/api-routes.configuration';

describe('UtilityService', () => {
  let service: UtilityService = null;
  let httpMock: HttpTestingController = null;
  let mockBackend: MockBackend = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: apiRoutes, useValue: 'https://www.agile1.us/api' },
        UtilityService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

    service = TestBed.get(UtilityService);
    httpMock = TestBed.get(HttpTestingController);
    mockBackend = getTestBed().get(MockBackend);

    TestBed.compileComponents();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get()', () => {
    const mockResponse = {
      data: [
        { id: 0, name: 'Video 0' },
        { id: 1, name: 'Video 1' },
        { id: 2, name: 'Video 2' },
        { id: 3, name: 'Video 3' }
      ]
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

    service.get().subscribe(interviews => {
      expect(interviews.length).toBe(11);
      expect(interviews[0].CandidateName).toEqual('Video 0');
      expect(interviews[0].JobName).toEqual('Video 1');
      expect(interviews[2].Status).toEqual('Video 2');
      expect(interviews[3].Date).toEqual('Video 3');
    });
  });
});
