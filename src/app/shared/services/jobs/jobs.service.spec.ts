import { MockBackend } from '@angular/http/testing';
import { RequestMethod, ResponseOptions } from '@angular/http';
import { HttpClientTestingModule } from '@angular/common/http/testing/src/module';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject, async, getTestBed } from '@angular/core/testing';

import { JobsService } from './jobs.service';
import { Job } from '../../../models/domain/Job';

const _route = '/api/jobs/';
const _enviroment = 'https://www.agile1.us/api';
const _Id = 1;
const _singleJob = [];

describe('JobsService', () => {
  let service: JobsService = null;
  let httpMock: HttpTestingController = null;
  let mockBackend: MockBackend = null;

  const dummyJobs: Job[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobsService, MockBackend]
    });

    service = TestBed.get(JobsService);
    httpMock = TestBed.get(HttpTestingController);
    mockBackend = getTestBed().get(MockBackend);
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

  // GET
  it(
    'should exist from API  vie GET with Id',
    async(() => {
      const parameters = this._Id;
      const route = this._route + parameters;
      const url = this._environment + (route ? route : '');

      const result = service.Get(url).subscribe(job => {
        expect(this._Id).toBeDefined();

        expect(job).toEqual(this._singleJob);
      });
    })
  );

  it(
    'should delete an existing job entry',
    async(() => {
      // let blogService: BlogService = getTestBed().get(BlogService);
      mockBackend.connections.subscribe(connection => {
        expect(connection.request.method).toBe(RequestMethod.Delete);
        // see options for proper delete returns in real life
        // here: http://stackoverflow.com/questions/6581285/is-a-response-body-allowed-for-a-http-delete-request
        connection.mockRespond(
          new Response(new ResponseOptions({ status: 204 }))
        );
      });
    })
  );

  // POST
  it('should post the correct data', () => {
    const url = this._environment.apiUrl + (this._route ? this._route : '');

    const job: Job = new Job();
    job.JobTitle = 'ABC';
    job.ApprovalComment = 'comment';
    service.post(url, job).subscribe((data: any) => {
      expect(data.firstname).toBe('ABC');
    });

    const req = httpMock.expectOne(url, 'post to api');
    expect(req.request.method).toBe('POST');

    req.flush({
      firstname: 'ABC'
    });

    httpMock.verify();
  });

  // PUT
  it('should put the correct data', () => {
    const url = this._environment.apiUrl + (this._route ? this._route : '');

    const job: Job = new Job();
    job.JobTitle = 'ABC1';
    job.ApprovalComment = 'comment';

    service.put(url, job).subscribe((data: any) => {
      expect(data.firstname).toBe('ABC1');
    });

    const req = httpMock.expectOne(url, 'put to api');
    expect(req.request.method).toBe('PUT');

    req.flush({
      firstname: 'ABC1'
    });

    httpMock.verify();
  });

  // Delete
  it('should delete the correct data', () => {
    const Id = 11;
    const url =
      this._environment.apiUrl + (this._route ? this._route : '') + '/' + Id;

    service.delete(url).subscribe((data: any) => {
      expect(data).toBe(3);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('DELETE');

    req.flush(Id);

    httpMock.verify();
  });


  // Patch
  it('should put the correct data', () => {
    const url = this._environment.apiUrl + (this._route ? this._route : '');

    const job: Job = new Job();
    job.JobTitle = 'ABC1';
    job.ApprovalComment = 'comment';

    service.put(url, job).subscribe((data: any) => {
      expect(data.JobTitle).toBe('ABC1');
    });

    const req = httpMock.expectOne(url, 'put to api');
    expect(req.request.method).toBe('PUT');

    req.flush({
      firstname: 'ABC1'
    });

    httpMock.verify();
  });
});
