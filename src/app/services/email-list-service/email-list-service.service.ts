import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppConstants } from '../../constants/constants'
import { AddToEmailListSubmission } from '../../models/add-to-email-list-submission';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class EmailListServiceService {

  private addToEmailListUrl = AppConstants.AWS_SQL_EXPRESS_ENPOINT_ADD_TO_EMAIL_LIST;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  /** POST: submit email list subscription form to express mysql service */
  addToEmailListSubmission (addToEmailListSubmission: AddToEmailListSubmission): Observable<any> {
    const http$ = this.http.post<any>(
                    this.addToEmailListUrl, 
                    addToEmailListSubmission, 
                    httpOptions
                  );
                  
    return http$.pipe(
      tap(res => {
        res.confirmation === 'fail' 
          ? this.showNotification(res.message.message, AppConstants.redSnackBar) 
          : this.showNotification('Thanks for signing up.', AppConstants.blueSnackBar);
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
