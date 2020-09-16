import { TestBed } from '@angular/core/testing';

import { ContactFormSubmissionServiceService } from './contact-form-submission-service.service';

describe('ContactFormSubmissionServiceService', () => {
  let service: ContactFormSubmissionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactFormSubmissionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
