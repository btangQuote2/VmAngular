import { Observable } from 'rxjs/Observable';
import { Calendar } from './../../../models/domain/Calendar';
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
import { InterviewSearchService } from './interview-search.service';

const _route = '/api/languages?';
const _enviroment = 'https://www.agile1.us/api';
const _url = '/api/languages?';

describe('GlobalService', () => {
  let service: InterviewSearchService;

  const dummyCalenders: Calendar[] = [];

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InterviewSearchService]
    });

    service = TestBed.get(InterviewSearchService);
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
    const id = 0;






    const result = service.Get().subscribe((interviews: Interview[]) => {
      expect(interviews.length).toBe(dummyInterviews.length);
      expect(interviews).toEqual(dummyInterviews);
    });

    const request = httpMock.expectOne(`${this._route}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyString);
  });
});
