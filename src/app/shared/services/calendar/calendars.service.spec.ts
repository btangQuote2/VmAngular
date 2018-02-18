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

const _route = 'api/calendars/';
const _enviroment = 'https://www.agile1.us/api';

describe('CalendersService', () => {
  let service: CalendersService;

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
      providers: [CalendersService]
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
    const entity: DateFromTo = new DateFromTo();

    const result = service.Get(entity).subscribe(calenders => {
      expect(calenders.length).toBe(dummyCalenders.length);
      expect(calenders).toEqual(dummyCalenders);
    });

    const request = httpMock.expectOne(`${this._route}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyCalenders);
  });
});
