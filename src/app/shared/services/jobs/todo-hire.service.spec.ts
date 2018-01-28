import { TestBed, inject } from '@angular/core/testing';

import { TodoHireService } from './todo-hire.service';

describe('TodoHireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoHireService]
    });
  });

  it('should be created', inject([TodoHireService], (service: TodoHireService) => {
    expect(service).toBeTruthy();
  }));
});
