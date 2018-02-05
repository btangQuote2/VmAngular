import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { TodoManageService } from './todo-manage.service';
import { apiRoutes } from '../../configurations/api-routes.configuration';
import { environment } from '../../../../environments/environment';
import { DebugElement } from '@angular/core';
import { TodoHire } from '../../../models/domain/TodoHire';

const _route = 'api/jobs/todo-manage';
const _enviroment = 'https://www.agile1.us/api';

describe('TodoManageService', () => {
  let service: TodoManageService;

  // const debugElement: DebugElement;const
  const dummyTodoHires: TodoHire[] = [
    {
      code: 'ExtensionRateChange',
      desc: 'Approve Extension / Rate Change',
      count: 10
    },
    {
      code: 'ApprovedAdditionalExpenses',
      desc: 'Approve Additional Expenses',
      count: 8
    },
    {
      code: 'ApproveRenewal',
      desc: 'Approve Renewal',
      count: 2
    },
    {
      code: 'ApproveTimecard',
      desc: 'Approve Timecard / Expense',
      count: 5
    }
  ];

  // tslint:disable-next-line:prefer-const
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoManageService]
    });

    service = TestBed.get(TodoManageService);
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

  it('should retrieve jobs from the API via GET', () => {
    const url = this._enviroment + this._route;
    const result = service.get().subscribe(todoHires => {
      expect(todoHires.length).toBe(dummyTodoHires.length);
      expect(todoHires).toEqual(dummyTodoHires);
    });

    const request = httpMock.expectOne(`${url}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyTodoHires);
  });
});
