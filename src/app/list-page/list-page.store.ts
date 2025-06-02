import { HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { parse } from 'http-link-header';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import { BooksService } from '../services/books.service';
import { CharactersService } from '../services/characters.service';
import { HousesService } from '../services/houses.service';
import { Book } from '../shared/models/book';
import { Character } from '../shared/models/character';
import { House } from '../shared/models/house';

const DEFAULT_PAGE_SIZE = 20;

type ListPageState = {
  resource: 'books' | 'houses' | 'characters';
  isLoading: boolean;
  books: Book[];
  houses: House[];
  characters: Character[];
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
  queryForm: FormControl<string | null>;
};

const initialState: ListPageState = {
  resource: 'books',
  isLoading: false,
  books: [],
  houses: [],
  characters: [],
  query: '',
  booksFilter: { page: 1, pageSize: DEFAULT_PAGE_SIZE },
  housesFilter: { page: 1, pageSize: DEFAULT_PAGE_SIZE },
  charactersFilter: { page: 1, pageSize: DEFAULT_PAGE_SIZE },
  queryForm: new FormControl<string>(''),
};

export const ListPageStore = signalStore(
  // state
  withState(initialState),
  // Hooks
  withHooks({
    onInit(store, router = inject(Router)) {
      // Check navbar active from current url path
      router.events
        .pipe(
          filter(
            (e: Event | RouterEvent): e is RouterEvent =>
              e instanceof RouterEvent && e instanceof NavigationEnd
          )
        )
        .subscribe((e: RouterEvent) => {
          patchState(store, {
            resource: getResourceType(e.url),
            query: '',
          });
          store.queryForm().setValue('');
        });
    },
  }),
  // methods
  withMethods(
    (
      store,
      booksService = inject(BooksService),
      housesService = inject(HousesService),
      charactersService = inject(CharactersService)
    ) => ({
      updateQuery(query: string): void {
        patchState(store, { query: query });
      },
      // RxJs methods
      loadBooksByQuery: rxMethod<string>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((query) => {
            return booksService.getByQuery(query, 1, DEFAULT_PAGE_SIZE).pipe(
              tapResponse({
                next: (res) => {
                  console.log('===res: ', res);
                  const linkHeader = res?.headers?.get('Link');

                  if (linkHeader) {
                    const parsedLinks = parse(linkHeader);
                    console.log('==Parsed Link Header:', parsedLinks);
                  }
                  patchState(store, {
                    books: res.body || [],
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
            return housesService.getByQuery(query, 1, DEFAULT_PAGE_SIZE).pipe(
              tapResponse({
                next: (res) => {
                  console.log('===res: ', res);
                  const linkHeader = res?.headers?.get('Link');

                  if (linkHeader) {
                    const parsedLinks = parse(linkHeader);
                    console.log('==Parsed Link Header:', parsedLinks);
                  }
                  patchState(store, {
                    houses: res.body || [],
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

      loadCharactersByQuery: rxMethod<string>(
        pipe(
          debounceTime(300),
          // distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((query) => {
            return charactersService
              .getByQuery(query, 1, DEFAULT_PAGE_SIZE)
              .pipe(
                tapResponse({
                  next: (res: HttpResponse<Character[]>) => {
                    console.log('===res: ', res);
                    const linkHeader = res?.headers?.get('Link');

                    if (linkHeader) {
                      const parsedLinks = parse(linkHeader);
                      console.log('==Parsed Link Header:', parsedLinks);
                    }
                    patchState(store, {
                      characters: res.body || [],
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

function getResourceType(url: string): 'books' | 'houses' | 'characters' {
  const resource = url.replace('/list/', '');
  if (
    resource === 'books' ||
    resource === 'houses' ||
    resource === 'characters'
  ) {
    return resource;
  }
  return 'books';
}
