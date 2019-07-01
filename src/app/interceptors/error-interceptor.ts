import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        if (error.error.message === 'Incorrect password') {
          return throwError(error);
        }
        window.alert(errorMessage);
        return throwError(error);
      })
    );
  }
}
