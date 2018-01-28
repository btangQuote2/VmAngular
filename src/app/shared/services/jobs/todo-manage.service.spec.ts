import { TestBed, inject } from '@angular/core/testing';

import { TodoManageService } from './todo-manage.service';

describe('TodoManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoManageService]
    });
  });

  it('should be created', inject([TodoManageService], (service: TodoManageService) => {
    expect(service).toBeTruthy();
  }));
});
