import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AddToEmailListSubmission } from '../../models/add-to-email-list-submission'
import { AppConstants } from '../../constants/constants'
import { EmailListServiceService } from '../../services/email-list-service/email-list-service.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  emailListForm: FormGroup
  addToEmailListSubmission: AddToEmailListSubmission
  submittingAddToEmailListForm: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private emailListServiceService: EmailListServiceService
  ) { }

  ngOnInit(): void {
    this.emailListForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(AppConstants.emailRegx)]]
    });
  }

  submit() {
    if (!this.emailListForm.valid) {
      return;
    }

    this.addToEmailListSubmission = {
      email: this.emailListForm.value.email
    }

    this.submittingAddToEmailListForm = true

    this.emailListServiceService.addToEmailListSubmission(this.addToEmailListSubmission)
      .pipe(
        catchError( err => of(err) )
      )
      .subscribe(
        res => console.log('HTTP Response', res),
        err => console.log('HTTP Error', err),
        () =>  this.submittingAddToEmailListForm = false
      )
  }

}
