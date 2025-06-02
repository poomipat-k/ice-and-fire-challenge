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
const DEBOUNCE_TIME = 400;

type QueryPayload = {
  query: string;
  page: number;
  pageSize: number;
};

type ListPageState = {
  resource: 'books' | 'houses' | 'characters';
  isLoading: boolean;
  books: Book[];
  houses: House[];
  characters: Character[];
  booksFilter: {
    query: string;
    page: number;
    pageSize: number;
  };
  housesFilter: {
    query: string;
    page: number;
    pageSize: number;
  };
  charactersFilter: {
    query: string;
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
  booksFilter: { query: '', page: 1, pageSize: DEFAULT_PAGE_SIZE },
  housesFilter: { query: '', page: 1, pageSize: DEFAULT_PAGE_SIZE },
  charactersFilter: { query: '', page: 1, pageSize: DEFAULT_PAGE_SIZE },
  queryForm: new FormControl<string>(''),
};

export const ListPageStore = signalStore(
  // state
  withState(initialState),
  // Hooks
  withHooks({
    onInit(store, router = inject(Router)) {
      // Check current active url
      router.events
        .pipe(
          filter(
            (e: Event | RouterEvent): e is RouterEvent =>
              e instanceof RouterEvent && e instanceof NavigationEnd
          )
        )
        .subscribe((e: RouterEvent) => {
          patchState(store, {
            isLoading: true,
            resource: getResourceType(e.url),
            books: [],
            houses: [],
            characters: [],
            booksFilter: { query: '', page: 1, pageSize: DEFAULT_PAGE_SIZE },
            housesFilter: { query: '', page: 1, pageSize: DEFAULT_PAGE_SIZE },
            charactersFilter: {
              query: '',
              page: 1,
              pageSize: DEFAULT_PAGE_SIZE,
            },
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
      updateQuery({
        query,
        resource,
      }: {
        query: string;
        resource: string;
      }): void {
        if (resource === 'books') {
          patchState(store, (state) => ({
            booksFilter: { ...state.booksFilter, query: query },
          }));
        } else if (resource === 'houses') {
          patchState(store, (state) => ({
            housesFilter: { ...state.housesFilter, query: query },
          }));
        } else if (resource === 'characters')
          patchState(store, (state) => ({
            charactersFilter: { ...state.charactersFilter, query: query },
          }));
      },
      // RxJs methods
      loadBooksByQuery: rxMethod<QueryPayload>(
        pipe(
          debounceTime(DEBOUNCE_TIME),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((payload) => {
            return booksService
              .getByQuery(payload.query, payload.page, payload.pageSize)
              .pipe(
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

      loadHousesByQuery: rxMethod<QueryPayload>(
        pipe(
          debounceTime(DEBOUNCE_TIME),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((payload) => {
            return housesService
              .getByQuery(payload.query, payload.page, payload.pageSize)
              .pipe(
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

      loadCharactersByQuery: rxMethod<QueryPayload>(
        pipe(
          debounceTime(DEBOUNCE_TIME),
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((payload) => {
            console.log('==payload', payload);
            return charactersService
              .getByQuery(payload.query, payload.page, payload.pageSize)
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

// helper functions
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
