import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { Character } from '../models/character';
import { House } from '../models/house';

export interface QueryResource {
  getByQuery(
    query: string,
    page: number,
    pageSize: number
  ): Observable<Book[] | House[] | Character[]>;
}
