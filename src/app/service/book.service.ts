import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Status } from '../enum/status.enum';
import { Book } from '../interface/book';
import { CustomResponse } from '../interface/custom-response';

@Injectable({ providedIn: 'root' })
export class BookService {

  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  //wersja 1
  // getBooks(): Observable<CustomResponse> {
  //   return this.http.get<CustomResponse>('http://localhost:8080/book/list')
  // }

  //wersja 2
  books$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/book/list`)
    // this.http.get<CustomResponse>(`${this.apiUrl}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  save$ = (book: Book) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${this.apiUrl}/book/save`, book)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  delete$ = (id: number) => <Observable<CustomResponse>>
    this.http.delete<CustomResponse>(`${this.apiUrl}/book/delete/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  filter$ = (status: Status, response: CustomResponse) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
      subscriber => {
        console.log(response);
        subscriber.next(
          status === Status.ALL ? { ...response, message: `Server filtered by ${status} status` } :
            {
              ...response,
              message: response.data.books
                .filter(book => book.status === status).length > 0 ? `Server filtered by 
          ${status === Status.BOOK_UP ? 'BOOK UP' : 'BOOK DOWN'} status` : `No books of ${status} found`,
              data: {
                books: response.data.books
                  .filter(book => book.status === status)
              }
            }
        );
        subscriber.complete();
      }
    )
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error)
    return throwError(`An error occured - Error code: ${error.status} status`);
  }
}
