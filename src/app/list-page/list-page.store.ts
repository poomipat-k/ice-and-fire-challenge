import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { BooksService } from '../services/books.service';

type ListPageState = {
  resource: 'books' | 'houses' | 'characters';
  isLoading: boolean;
  filter: {
    query: string;
    page: number;
    pageSize: number;
  };
};

const initialState: ListPageState = {
  resource: 'books',
  isLoading: false,
  filter: { query: '', page: 1, pageSize: 10 },
};

export const ListPageStore = signalStore(
  // state
  withState(initialState),
  // computed
  withMethods((store, booksService = inject(BooksService)) => ({
    updateQuery(query: string): void {
      // Updating state using the `patchState` function
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    },
    // RxJs methods
    loadByQuery: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) => {
          console.log('==query', query);
          return booksService.getByQuery(query, 1, 10).pipe(
            tapResponse({
              next: (books) => {
                console.log('books: ', books);
                patchState(store, { isLoading: false });
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
