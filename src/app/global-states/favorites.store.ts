import { effect, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  getState,
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { combineLatest } from 'rxjs';
import { BooksService } from '../services/books.service';
import { CharactersService } from '../services/characters.service';
import { HousesService } from '../services/houses.service';
import { Book } from '../shared/models/book';
import { Character } from '../shared/models/character';
import { House } from '../shared/models/house';

const LOCAL_STORAGE_FAV = 'favorites';

const FILL_EMPTY_CARD_PER_ROW = 9; // assume biggest to support is 4k Monitor

type FavoritesState = {
  resource: 'books' | 'houses' | 'characters';
  isLoading: boolean;
  emptySpace: number[];
  books: number[]; // ids
  houses: number[]; // ids
  characters: number[]; // ids
  booksData: Book[];
  housesData: House[];
  charactersData: Character[];
};

type FavoritesLocalStorage = {
  books: number[];
  houses: number[];
  characters: number[];
};

const initialState: FavoritesState = {
  resource: 'books',
  isLoading: false,
  emptySpace: [...Array(FILL_EMPTY_CARD_PER_ROW).keys()],
  books: [],
  houses: [],
  characters: [],
  booksData: [],
  housesData: [],
  charactersData: [],
};

export const FavoritesStore = signalStore(
  { providedIn: 'root' }, // make it global state
  // state
  withState(initialState),
  withMethods(
    (
      store,
      booksService = inject(BooksService),
      housesService = inject(HousesService),
      charactersService = inject(CharactersService)
    ) => ({
      // expect eg. books/1
      updateFavorites(path: string): void {
        const split = path.split('/');
        if (split.length != 2) {
          console.error('[updateFavorites] invalid input, input:', path);
          return;
        }
        const [resource, id] = split;
        if (
          resource !== 'books' &&
          resource !== 'houses' &&
          resource !== 'characters'
        ) {
          console.error(
            '[updateFavorites] invalid resource, resource:',
            resource
          );
          return;
        }
        if (this._shouldAdd(resource, +id)) {
          this._addFavorites(resource, +id);
        } else {
          this._removeFavorites(resource, +id);
        }
      },
      isFavored(resource: string, resourceId: number): boolean {
        if (
          resource === 'books' ||
          resource === 'houses' ||
          resource === 'characters'
        ) {
          return !!store[resource]()?.find((s) => s === +resourceId);
        } else {
          return false;
        }
      },

      getDetailsPath(url: string): string {
        const split = url.split('anapioficeandfire.com/api');
        if (split.length < 2) {
          return '';
        }
        return split[split.length - 1];
      },

      getFavoritesBooks() {
        const requests = store.books().map((id) => booksService.getById(id));
        return combineLatest(requests).pipe(
          tapResponse({
            next: (data) => {
              patchState(store, { booksData: data, isLoading: false });
            },
            error: (err) => {
              patchState(store, { isLoading: false });
              console.error(err);
            },
            finalize: () => patchState(store, { isLoading: false }),
          })
        );
      },

      getFavoritesHouses() {
        const requests = store.houses().map((id) => housesService.getById(id));

        return combineLatest(requests).pipe(
          tapResponse({
            next: (data) => {
              patchState(store, { housesData: data, isLoading: false });
            },
            error: (err) => {
              patchState(store, { isLoading: false });
              console.error(err);
            },
            finalize: () => patchState(store, { isLoading: false }),
          })
        );
      },

      getFavoritesCharacters() {
        const requests = store
          .characters()
          .map((id) => charactersService.getById(id));
        return combineLatest(requests).pipe(
          tapResponse({
            next: (data) => {
              patchState(store, { charactersData: data, isLoading: false });
            },
            error: (err) => {
              patchState(store, { isLoading: false });
              console.error(err);
            },
            finalize: () => patchState(store, { isLoading: false }),
          })
        );
      },

      // Private methods

      _addFavorites(
        resource: 'books' | 'houses' | 'characters',
        resourceId: number
      ): void {
        patchState(store, (state) => {
          if (resource === 'books') {
            return {
              books: [...state.books, resourceId],
            };
          } else if (resource === 'houses') {
            return {
              houses: [...state.houses, resourceId],
            };
          } else if (resource === 'characters') {
            return {
              characters: [...state.characters, resourceId],
            };
          }
          return state;
        });
      },
      _removeFavorites(resource: string, resourceId: number) {
        patchState(store, (state) => {
          if (resource === 'books') {
            return {
              books: [...state.books].filter((id) => id !== resourceId),
              booksData: [...state.booksData].filter((book) => {
                const sp = book.url.split('/books/');
                const id = +sp[sp.length - 1];
                return id !== resourceId;
              }),
            };
          } else if (resource === 'houses') {
            return {
              houses: [...state.houses, resourceId].filter(
                (id) => id !== resourceId
              ),
              housesData: [...state.housesData].filter((house) => {
                const sp = house.url.split('/houses/');
                const id = +sp[sp.length - 1];
                return id !== resourceId;
              }),
            };
          } else if (resource === 'characters') {
            return {
              characters: [...state.characters, resourceId].filter(
                (id) => id !== resourceId
              ),
              charactersData: [...state.charactersData].filter((character) => {
                const sp = character.url.split('/characters/');
                const id = +sp[sp.length - 1];
                return id !== resourceId;
              }),
            };
          }
          return state;
        });
      },

      _shouldAdd(resource: string, resourceId: number): boolean {
        if (
          resource === 'books' ||
          resource === 'houses' ||
          resource === 'characters'
        ) {
          return !store[resource]()?.find((s) => s === +resourceId);
        } else {
          console.error('[_shouldAdd] invalid resource, input:', resource);
          return false;
        }
      },
    })
  ),

  withHooks({
    onInit(store) {
      const favoritesLc = localStorage.getItem(LOCAL_STORAGE_FAV);
      if (favoritesLc) {
        const favorites: FavoritesLocalStorage = JSON.parse(favoritesLc);

        patchState(store, {
          books: favorites.books || [],
          houses: favorites.houses || [],
          characters: favorites.characters || [],
        });
      } else {
        // Add favorites into localStorage when user visited site
        const newFavorites: FavoritesLocalStorage = {
          books: [],
          houses: [],
          characters: [],
        };
        localStorage.setItem(LOCAL_STORAGE_FAV, JSON.stringify(newFavorites));

        patchState(store, {
          books: [],
          houses: [],
          characters: [],
        });
      }

      effect(() => {
        const state = getState(store);
        const favLocal: FavoritesLocalStorage = {
          books: state.books,
          houses: state.houses,
          characters: state.characters,
        };
        localStorage.setItem(LOCAL_STORAGE_FAV, JSON.stringify(favLocal));
      });
    },
  })
);
