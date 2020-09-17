import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppConstants } from '../../constants/constants'
import { ContactFormSubmission } from '../../models/contact-form-submission';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ContactFormSubmissionService {

  private contactFormSubmissionUrl = AppConstants.EMAIL_DISPATCH_SEND;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  /** POST: submit contact form to email-dispatch service */
  addContactFormSubmission (contactFormSubmission: ContactFormSubmission): Observable<any> {
    const http$ = this.http.post<any>(
                    this.contactFormSubmissionUrl, 
                    contactFormSubmission, 
                    httpOptions
                  );
                  
    return http$.pipe(
      tap(res => {
        res.confirmation === 'fail' 
          ? this.showNotification(res.message.message, AppConstants.redSnackBar) 
          : this.showNotification(res.message, AppConstants.blueSnackBar);
      }),
      catchError(err => {
        if(err.error.errors) {
          err.error.errors.forEach(e => {
            this.showNotification(e.msg, AppConstants.redSnackBar);
          });
        }
        err.statusText 
          ? this.showNotification(err.statusText, AppConstants.redSnackBar) 
          : this.showNotification('Unknown Error', AppConstants.redSnackBar);
        
        return throwError(err);
      })
    );     
  }

  showNotification(text: string, style: string) {
    this.snackBar.open(text, null, {
      duration: 2000,
      panelClass: [style],
      horizontalPosition: 'end'
    });
  }

}
