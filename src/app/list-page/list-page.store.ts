import { HttpResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
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

const DEFAULT_PAGE_SIZE = 10;
const DEBOUNCE_TIME = 400;
const FILL_EMPTY_CARD_PER_ROW = 9; // assume biggest to support is 4k Monitor

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
  hasNextPage: boolean;
  emptySpace: number[];
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
  hasNextPage: false,
  emptySpace: [...Array(FILL_EMPTY_CARD_PER_ROW).keys()],
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
          // reset states when path changed
          patchState(store, {
            isLoading: true,
            resource: getResourceType(e.url),
            books: [],
            houses: [],
            characters: [],
            hasNextPage: false,
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
  // computed
  withComputed((store) => ({
    bookSkeletons: computed(() => {
      const total = store.booksFilter().pageSize + store.books().length;
      return [...Array(total)];
    }),
    houseSkeletons: computed(() => {
      const total = store.housesFilter().pageSize + store.houses().length;
      return [...Array(total)];
    }),
    characterSkeletons: computed(() => {
      const total =
        store.charactersFilter().pageSize + store.characters().length;
      return [...Array(total)];
    }),
  })),
  // methods
  withMethods(
    (
      store,
      booksService = inject(BooksService),
      housesService = inject(HousesService),
      charactersService = inject(CharactersService)
    ) => ({
      updateQuery(query: string): void {
        if (store.resource() === 'books') {
          patchState(store, (state) => ({
            books: [],
            booksFilter: { ...state.booksFilter, query: query, page: 1 },
          }));
        } else if (store.resource() === 'houses') {
          patchState(store, (state) => ({
            houses: [],
            housesFilter: { ...state.housesFilter, query: query, page: 1 },
          }));
        } else if (store.resource() === 'characters') {
          patchState(store, (state) => {
            return {
              characters: [],
              charactersFilter: {
                ...state.charactersFilter,
                query: query,
                page: 1,
              },
            };
          });
        }
      },

      loadMore(): void {
        if (store.resource() === 'books') {
          patchState(store, (state) => ({
            booksFilter: {
              ...state.booksFilter,
              page: state.booksFilter.page + 1,
            },
          }));
        } else if (store.resource() === 'houses') {
          patchState(store, (state) => ({
            housesFilter: {
              ...state.housesFilter,
              page: state.housesFilter.page + 1,
            },
          }));
        } else if (store.resource() === 'characters') {
          patchState(store, (state) => ({
            charactersFilter: {
              ...state.charactersFilter,
              page: state.charactersFilter.page + 1,
            },
          }));
        }
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
                    const linkHeader = res?.headers?.get('Link');

                    let hasNextPage = false;
                    if (linkHeader) {
                      const parsedLinks = parse(linkHeader);
                      console.log('==Parsed Link Header:', parsedLinks);
                      hasNextPage = !!parsedLinks.refs.find(
                        (link) => link.rel === 'next'
                      );
                    }

                    patchState(store, (state) => {
                      let newBooks = [...state.books];
                      if (res.body) {
                        newBooks = newBooks.concat(res.body);
                      }
                      return {
                        books: newBooks,
                        isLoading: false,
                        hasNextPage: hasNextPage,
                      };
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
                    const linkHeader = res?.headers?.get('Link');

                    let hasNextPage = false;
                    if (linkHeader) {
                      const parsedLinks = parse(linkHeader);
                      console.log('==Parsed Link Header:', parsedLinks);
                      hasNextPage = !!parsedLinks.refs.find(
                        (link) => link.rel === 'next'
                      );
                    }

                    patchState(store, (state) => {
                      let newHouses = [...state.houses];
                      if (res.body) {
                        newHouses = newHouses.concat(res.body);
                      }
                      return {
                        houses: newHouses,
                        isLoading: false,
                        hasNextPage: hasNextPage,
                      };
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
          tap(() =>
            patchState(store, (state) => {
              console.log('==wait loading state', state);
              return { isLoading: true };
            })
          ),
          switchMap((payload) => {
            return charactersService
              .getByQuery(payload.query, payload.page, payload.pageSize)
              .pipe(
                tapResponse({
                  next: (res: HttpResponse<Character[]>) => {
                    const linkHeader = res?.headers?.get('Link');

                    let hasNextPage = false;
                    if (linkHeader) {
                      const parsedLinks = parse(linkHeader);
                      console.log('==Parsed Link Header:', parsedLinks);
                      hasNextPage = !!parsedLinks.refs.find(
                        (link) => link.rel === 'next'
                      );
                    }
                    patchState(store, (state) => {
                      let newCharacters = [...state.characters];
                      if (res.body) {
                        newCharacters = newCharacters.concat(res.body);
                      }
                      return {
                        characters: newCharacters,
                        isLoading: false,
                        hasNextPage: hasNextPage,
                      };
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

function getNextPage(url: string): number {
  return 0;
}
