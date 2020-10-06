import { TestBed } from '@angular/core/testing';

import { ContactFormSubmissionService } from './contact-form-submission-service.service';

describe('ContactFormSubmissionService', () => {
  let service: ContactFormSubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactFormSubmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
