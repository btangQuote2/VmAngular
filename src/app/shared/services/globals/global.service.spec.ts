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
import { GlobalService } from './global.service';
import { Interview } from '../../../models/domain/Interview';

const _route = '/api/languages?';
const _enviroment = 'https://www.agile1.us/api';
const _url = '/api/languages?';

describe('GlobalService', () => {
  let service: GlobalService;

  const dummyInterview: Interview[] = [];

  const interview = new Interview();
  interview.CandidateName = 'ExtensionRateChange';
  interview.InterviewId = 0;
  interview.JobName = '10';
  interview.Status = '';
  interview.timeZone = '';
  dummyInterview.push(interview);

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GlobalService]
    });

    service = TestBed.get(GlobalService);
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
    const dummyString = '';
    const result = service.Get(id).subscribe((stringResult: string) => {
      expect(stringResult).toEqual(dummyString);
    });

    const request = httpMock.expectOne(`${this._route}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyString);
  });
});
