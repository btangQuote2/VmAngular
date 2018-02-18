import { Observable } from 'rxjs/Observable';
import { Calendar } from './../../../models/domain/Calendar';
import { CalendersService } from './calendars.service';
import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { apiRoutes } from '../../configurations/api-routes.configuration';
import { environment } from '../../../../environments/environment';
import { DebugElement } from '@angular/core';
import { TodoHire } from '../../../models/domain/TodoHire';
import { DateFromTo } from '../../../models/domain/DateFromTo';
import { DocumentsSearchService } from './documents-search.service';

const _route = 'api/jobs/todo-manage';
const _enviroment = 'https://www.agile1.us/api';
const _url = 'api/calendars/';

describe('DocumentsSearchService', () => {
  let service: DocumentsSearchService;

  const dummyCalenders: Calendar[] = [];

  const calendar = new Calendar();
  calendar.CandidateName = 'ExtensionRateChange';
  calendar.JobId = 0;
  calendar.AssignmentId = 10;
  calendar.EventType = '';
  calendar.Date = '';
  dummyCalenders.push(calendar);

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DocumentsSearchService]
    });

    service = TestBed.get(CalendersService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('route should be correct', () => {
    const route = service._route;
    expect(this._route).toBe(route);
  });

  it('environment should be correct', () => {
    const enviroment = service._route;
    expect(this._enviroment).toBe(enviroment);
  });

  it('Get', () => {
    const dummyString: string[] = [];
    const result = service.Get().subscribe((stringResult: string[]) => {
      expect(stringResult.length).toBe(dummyString.length);
      expect(dummyString).toEqual(dummyString);
    });

    const request = httpMock.expectOne(`${this._url}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyString);
  });
});
