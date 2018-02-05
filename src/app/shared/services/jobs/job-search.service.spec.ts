import { Job } from './../../../models/domain/Job';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { JobSearchService } from './job-search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing/src/module';
import { DateFromTo } from '../../../models/domain/DateFromTo';

const _route = '/api/jobs/search?';
const _enviroment = 'https://www.agile1.us/api';

const _startDate = '2011-1-1';
const _endDate = '2017-11-1';

describe('JobSearchService', () => {
  // tslint:disable-next-line:prefer-const
  let service: JobSearchService;
  // tslint:disable-next-line:prefer-const
  let httpMock: HttpTestingController;

  const dummyJobs: Job[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobSearchService]
    });
    service = TestBed.get(JobSearchService);
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

  it('should retrive jobs from the API vie GET with start date and end date', () => {
    const parameters =
      `start=${this._startDate}` + `&` + `end=${this._endDate}`;

    this._route = this.get_jobsearch + parameters;
    const url = this._environment + (this._route ? this._route : '');

    const entity: DateFromTo = new DateFromTo();

    entity.StartDate = this._startDate;
    entity.EndDate = this._endDate;

    const result = service.Search(entity).subscribe(jobs => {
      expect(jobs.length).toBe(dummyJobs.length);
      expect(jobs).toEqual(dummyJobs);
    });

    const request = httpMock.expectOne(`${url}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyJobs);
  });
});
