import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { BooksService } from '../services/books.service';
import { CharactersService } from '../services/characters.service';
import { HousesService } from '../services/houses.service';

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
        // Updating state using the `patchState` function
        console.log('==updatedQuery:', query);
        patchState(store, (state) => ({ filter: { ...state.filter, query } }));
      },
      // RxJs methods
      loadBooksByQuery: rxMethod<string>(
        pipe(
          debounceTime(400),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((query) => {
            console.log('==books query', query);
            return booksService.getByQuery(query, 1, 10).pipe(
              tapResponse({
                next: (books) => {
                  console.log('===books: ', books);
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

      loadHousesByQuery: rxMethod<string>(
        pipe(
          debounceTime(400),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((query) => {
            console.log('==houses query', query);
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
          debounceTime(400),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((query) => {
            console.log('==characters query', query);
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
