import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from '../../environments/environment';
import { QueryResource } from '../shared/interfaces/query-resource';
import { Character } from '../shared/models/character';
import { handleError } from './error-handling';

@Injectable({
  providedIn: 'root',
})
export class CharactersService implements QueryResource {
  private readonly http: HttpClient = inject(HttpClient);
  private baseApiUrl = environment.apiUrl;

  constructor() {}

  getByQuery(query: string, queryOn: string, page: number, pageSize: number) {
    return this.http
      .get<Character[]>(
        `${this.baseApiUrl}/characters?${queryOn}=${query}&page=${page}&pageSize=${pageSize}`,
        { observe: 'response' }
      )
      .pipe(catchError(handleError));
  }

  getById(id: number) {
    return this.http
      .get<Character>(`${this.baseApiUrl}/characters/${id}`)
      .pipe(catchError(handleError));
  }
}
