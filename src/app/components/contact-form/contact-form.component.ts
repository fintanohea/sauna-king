import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ContactFormSubmission } from '../../models/contact-form-submission'
import { AppConstants } from '../../constants/constants'
import { ContactFormSubmissionService } from '../../services/contact-form-service/contact-form-submission-service.service'

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup
  contactFormSubmission: ContactFormSubmission
  submittingForm: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private contactFormSubmissionService: ContactFormSubmissionService
  ) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(AppConstants.emailRegx)]],
      message: [null, Validators.required]
    });
  }

  submit() {
    if (!this.contactForm.valid) {
      return;
    }

    this.contactFormSubmission = {
      recipients: AppConstants.CONTACT_EMAIL, 
      subject: 'Gracie Barra Dublin form submission: ' + this.contactForm.value.name, 
      content: 'Name: ' + this.contactForm.value.name + '<br>' + 
                'Email: ' + this.contactForm.value.email + '<br>' + 
                'Message: ' + this.contactForm.value.message, 
      html: 'Name: ' + this.contactForm.value.name + '<br>' + 
            'Email: ' + this.contactForm.value.email + '<br>' + 
            'Message: ' + this.contactForm.value.message
    }

    this.submittingForm = true

    this.contactFormSubmissionService.addContactFormSubmission(this.contactFormSubmission)
      .pipe(
        catchError( err => of(err) )
      )
      .subscribe(
        res => console.log('HTTP Response', res),
        err => console.log('HTTP Error', err),
        () =>  this.submittingForm = false
      )
  }
}
