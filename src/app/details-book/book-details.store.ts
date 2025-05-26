import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Book } from '../shared/models/book';

type BookDetailsState = {
  book: Book;
  isLoading: boolean;
};

const initialState: BookDetailsState = {
  book: {
    url: '',
    name: '',
    isbn: '',
    authors: [],
    numberOfPages: 0,
    publisher: '',
    country: '',
    mediaType: '',
    released: '',
    characters: [],
    povCharacters: [],
  },
  isLoading: false,
};

export const BookDetailsStore = signalStore(
  // state
  withState(initialState),
  withMethods((store, booksService = inject(BooksService)) => ({
    loadById: rxMethod<number>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return booksService.getById(id).pipe(
            tapResponse({
              next: (book) => {
                console.log('===book: ', book);
                patchState(store, {
                  book: book,
                  isLoading: false,
                });
              },
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
  }))
);
