import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
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
  withMethods(
    (
      store,
      booksService = inject(BooksService),
      titleService = inject(Title)
    ) => ({
      transformDate(date: string) {
        const released = new Date(date);
        let releasedStr = '';
        if (!released.getDate()) {
          releasedStr = '-';
        } else {
          releasedStr = released.toLocaleDateString('en-UK', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          });
        }
        return releasedStr;
      },

      loadById: rxMethod<number>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((id) => {
            return booksService.getById(id).pipe(
              tapResponse({
                next: (book) => {
                  titleService.setTitle(`Book - ${book.name}`);
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
    })
  )
);
