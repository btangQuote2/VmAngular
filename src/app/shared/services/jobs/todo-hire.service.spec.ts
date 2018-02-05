import { TestBed, inject } from '@angular/core/testing';

import { TodoHireService } from './todo-hire.service';
import { HttpClientTestingModule } from '@angular/common/http/testing/src/module';
import { TodoHire } from '../../../models/domain/TodoHire';

const _route = '/api/jobs/todo-hire';
const _enviroment = 'https://www.agile1.us/api';

describe('TodoHireService', () => {
  let service: TodoHireService;

  // const debugElement: DebugElement;const
  const dummyTodoHires: TodoHire[] = [
    {
      code: 'ApprovedJob',
      desc: 'Approve Requisition',
      count: 10
    },
    {
      code: 'ReviewCandidate',
      desc: 'Rreview Candidate',
      count: 12
    },
    {
      code: 'ApprovedProjct',
      desc: 'Approve Project',
      count: 15
    },
    {
      code: 'RejectedJob',
      desc: 'Manage Rejected Requisition',
      count: 41
    },
    {
      code: 'NegociateRate',
      desc: 'Negociate Rate',
      count: 1
    },
    {
      code: 'ReviewProposal',
      desc: 'Review Proposal',
      count: 16
    },
    {
      code: 'ApprovedPaymentSchedule',
      desc: 'Approve Payment Schedule',
      count: 0
    },
    {
      code: 'ApprovedEngagement',
      desc: 'Approve Engagement',
      count: 3
    },
    {
      code: 'ApprovedPrposals',
      desc: 'Approve Prposals',
      count: 2
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoHireService]
    });

    service = TestBed.get(TodoHireService);
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

  it('should retriveve TodoHire from API via GET', () => {
    service.get().subscribe(todoHire => {
      expect(todoHire.length).toBe(dummyTodoHires.length);
    });
  });
});
