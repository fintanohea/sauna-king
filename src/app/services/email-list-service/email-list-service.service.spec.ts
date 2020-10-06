import { TestBed } from '@angular/core/testing';

import { EmailListServiceService } from './email-list-service.service';

describe('EmailListServiceService', () => {
  let service: EmailListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
