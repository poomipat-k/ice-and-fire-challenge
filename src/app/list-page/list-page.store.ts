import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { BooksService } from '../services/books.service';
import { CharactersService } from '../services/characters.service';
import { HousesService } from '../services/houses.service';
import { Book } from '../shared/models/book';

type ListPageState = {
  resource: 'books' | 'houses' | 'characters';
  isLoading: boolean;
  books: Book[];
  query: string;
  booksFilter: {
    page: number;
    pageSize: number;
  };
  housesFilter: {
    page: number;
    pageSize: number;
  };
  charactersFilter: {
    page: number;
    pageSize: number;
  };
};

const initialState: ListPageState = {
  resource: 'books',
  isLoading: false,
  books: [],
  query: '',
  booksFilter: { page: 1, pageSize: 10 },
  housesFilter: { page: 1, pageSize: 10 },
  charactersFilter: { page: 1, pageSize: 10 },
};

export const ListPageStore = signalStore(
  // state
  withState(initialState),
  // methods
  withMethods(
    (
      store,
      booksService = inject(BooksService),
      housesService = inject(HousesService),
      charactersService = inject(CharactersService)
    ) => ({
      changeResource(resource: 'books' | 'houses' | 'characters'): void {
        patchState(store, { resource: resource });
      },
      updateQuery(query: string): void {
        patchState(store, (state) => ({
          booksFilter: { ...state.booksFilter, query },
          housesFilter: { ...state.housesFilter, query },
          charactersFilter: { ...state.charactersFilter, query },
        }));
      },
      // RxJs methods
      loadBooksByQuery: rxMethod<string>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((query) => {
            return booksService.getByQuery(query, 1, 11).pipe(
              tapResponse({
                next: (books) => {
                  console.log('===books: ', books);
                  patchState(store, {
                    books: books,
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

      loadHousesByQuery: rxMethod<string>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((query) => {
            return housesService.getByQuery(query, 1, 10).pipe(
              tapResponse({
                next: (houses) => {
                  console.log('===houses: ', houses);
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

      loadCharactersByQuery: rxMethod<string>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((query) => {
            return charactersService.getByQuery(query, 1, 10).pipe(
              tapResponse({
                next: (characters) => {
                  console.log('===characters: ', characters);
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
    })
  )
);
