import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { handleError } from './error-handling';

@Injectable({
  providedIn: 'root',
})
export class HousesService {
  private readonly http: HttpClient = inject(HttpClient);
  private baseApiUrl = environment.apiUrl;

  constructor() {}

  getByQuery(query: string, page: number, pageSize: number): Observable<any> {
    return this.http
      .get<any>(
        `${this.baseApiUrl}/houses?name=${query}&page=${page}&pageSize=${pageSize}`
      )
      .pipe(catchError(handleError));
  }

  getAll(page: number, pageSize: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseApiUrl}/houses?page=${page}&pageSize=${pageSize}`)
      .pipe(catchError(handleError));
  }
}
