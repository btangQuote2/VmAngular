import { TestBed, inject } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { apiRoutes } from '../../configurations/api-routes.configuration';
import { environment } from '../../../../environments/environment';
import { AuthorizationResponse } from '../../../models/response/authorization-response';

const _route = '/Authorization';
const _enviroment = 'https://www.agile1.us/api';


describe('AuthorizationService', () => {
  let service: AuthorizationService;
  let httpMock: HttpTestingController;

  const auth = new AuthorizationResponse();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorizationService]
    });
    service = TestBed.get(AuthorizationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('route should be correct', () => {
    const route = apiRoutes.authorization;
    expect(this._route).toBe(route);
  });

  it('environment should be correct', () => {
    const enviroment = environment.apiUrl;
    expect(this._enviroment).toBe(enviroment);
  });

  it('getPermssions', () => {
    const result = service.getPermssions().subscribe(data => {
      expect(data).toEqual(auth);
    });


});
