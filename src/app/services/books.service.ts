import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { QueryResource } from '../shared/interfaces/query-resource';
import { Book } from '../shared/models/book';
import { handleError } from './error-handling';

@Injectable({
  providedIn: 'root',
})
export class BooksService implements QueryResource {
  private readonly http: HttpClient = inject(HttpClient);
  private baseApiUrl = environment.apiUrl;
  constructor() {}

  getByQuery(
    query: string,
    page: number,
    pageSize: number
  ): Observable<Book[]> {
    return this.http
      .get<Book[]>(
        `${this.baseApiUrl}/books?name=${query}&page=${page}&pageSize=${pageSize}`
      )
      .pipe(catchError(handleError));
  }

  getById(id: number) {
    return this.http
      .get<Book>(`${this.baseApiUrl}/books/${id}`)
      .pipe(catchError(handleError));
  }
}
