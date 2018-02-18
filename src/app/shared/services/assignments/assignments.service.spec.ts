import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { HttpTestingController } from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';
import { AssignmentSearchService } from './assignments-search.service';
import { HttpModule, XHRBackend, ResponseOptions } from '@angular/http';
import { apiRoutes } from '../../configurations/api-routes.configuration';
import { letProto } from 'rxjs/operator/let';
import { DateFromTo } from '../../../models/domain/DateFromTo';

describe('AssignmentsService', () => {
  let service: AssignmentSearchService = null;
  let httpMock: HttpTestingController = null;
  let mockBackend: MockBackend = null;
  const url = 'https://www.agile1.us/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        { provide: apiRoutes, useValue: 'https://www.agile1.us/api' },
        AssignmentSearchService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

    service = TestBed.get(AssignmentSearchService);
    httpMock = TestBed.get(HttpTestingController);
    mockBackend = getTestBed().get(MockBackend);

    TestBed.compileComponents();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Get(id:number)', () => {
    const mockResponse = {
      data: { Key: 1, Vale: 'Video 1' }
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

    const id: number = mockResponse.data.Key;

    service.Get(id).subscribe(keyValue => {
      expect(keyValue.Key).toEqual('1');
      expect(keyValue.Value).toEqual('Video 1');
    });
  });

  describe('Delete(id:number', () => {
    const mockResponse = {
      data: { Key: 1, Vale: 'Video 1' }
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
    const id: number = mockResponse.data.Key;
    service.Delete(id).subscribe(data => {
      expect(data).toBe(id);
    });

    const req = httpMock.expectOne(this.url, 'delete to api');
    expect(req.request.method).toBe('DELETE');

    req.flush(id);

    httpMock.verify();
  });

  it('POST', () => {
    const mockResponse = {
      data: { Key: 1, Vale: 'Video 1' }
    };
    service.post(url, mockResponse).subscribe((data: any) => {
      expect(data.firstname).toBe('Video 1');
    });

    const req = httpMock.expectOne(this.url, 'post to api');
    expect(req.request.method).toBe('POST');

    req.flush({
      firstname: 'Video 1'
    });

    httpMock.verify();
  });

  it('PUT', () => {
    const mockResponse = {
      data: { Key: 1, Vale: 'Video 1' }
    };
    service.put(url, mockResponse).subscribe((data: any) => {
      expect(data.firstname).toBe('Video 1');
    });

    const req = httpMock.expectOne(this.url, 'post to api');
    expect(req.request.method).toBe('POST');

    req.flush({
      firstname: 'Video 1'
    });

    httpMock.verify();
  });

  it('Search', () => {
    const entity = new DateFromTo();
    entity.StartDate = new Date('2011-1-1');
    entity.StartDate = new Date('2017-1-1');


    service.Search(entity).subscribe((data: any) => {
      expect(data.firstname).toBe('Video 1');
    });

    const req = httpMock.expectOne(this.url, 'post to api');
    expect(req.request.method).toBe('Search');

    req.flush({
      firstname: 'Video 1'
    });

    httpMock.verify();
  });
});
