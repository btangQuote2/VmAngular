import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { HttpModule, XHRBackend, ResponseOptions } from '@angular/http';
import { apiRoutes } from '../../configurations/api-routes.configuration';
import { MockBackend } from '@angular/http/testing';
import { NotificationSearchService } from '../notifications/notification-search.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { UserToken } from '../../../models/domain/UserToken';
import { Password } from '../../../models/domain/Password';
import { SecurityQuestion } from '../../../models/domain/SecurityQuestion';

describe('SettingService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let mockBackend: MockBackend = null;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],

      providers: [
        { provide: apiRoutes, useValue: 'https://www.agile1.us/api' },
        UserService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
    mockBackend = getTestBed().get(MockBackend);

    TestBed.compileComponents();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('postFirstTimeLogin()', () => {
    const mockResponse = {
      data: { Key: 1, Vale: 'Video 1' }
    };

    const mockpassword = new Password();
    mockpassword.newPassword = 'Video1';
    mockpassword.confirmPassword = 'Video1';

    const mockUserTokens: Observable<UserToken> = null;

    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })
        )
      );
    });

    service.postFirstTimeLogin(mockpassword).subscribe(userTokens => {
      expect(userTokens).toEqual(mockUserTokens);
    });
  });

  describe('getSecurityQuestion()', () => {
    const mockResponse = {
      data: { Key: 1, Vale: 'Video 1' }
    };

    const mockpassword = new Password();
    mockpassword.newPassword = 'Video1';
    mockpassword.confirmPassword = 'Video1';

    // tslint:disable-next-line:prefer-const
    let mockSecurityQuestions: Observable<SecurityQuestion[]>;

    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })
        )
      );
    });

    service
      .getSecurityQuestion(mockpassword)
      .subscribe((securityquestions: any) => {

        expect(securityquestions).toBe(mockSecurityQuestions);
      });
  });

  describe('postSecurityQuestion()', () => {
    const mockResponse = {
      data: { Key: 1, Vale: 'Video 1' }
    };

    // tslint:disable-next-line:prefer-const
    let mockSecurityQuestions: Observable<SecurityQuestion[]>;

    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })
        )
      );
    });

    service
      .postSecurityQuestion(mockSecurityQuestions)
      .subscribe((securityquestions: Observable<any[]>) => {

        expect(securityquestions).toBe(mockSecurityQuestions);
      });
  });

  describe('putSecurityQuestion()', () => {
    const mockResponse = {
      data: { Key: 1, Vale: 'Video 1' }
    };

    // tslint:disable-next-line:prefer-const
    let mockSecurityQuestions: Observable<SecurityQuestion[]>;

    mockBackend.connections.subscribe(connection => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })
        )
      );
    });

    service
      .postSecurityQuestion(mockSecurityQuestions)
      .subscribe((securityquestions: Observable<any[]>) => {

        expect(securityquestions).toBe(mockSecurityQuestions);
      });
  });
});
