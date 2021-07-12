import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  GO_API: string = '/api/status';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

   // Get state from api
  GetState() {
    return this.httpClient.get(`${this.GO_API}`)
      .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.errorHandle)
    )
  }

  // Error 
  errorHandle(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //client
      errorMessage = error.error.message;
    } else {
      //server
      errorMessage = `${error.status}: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
