import { effect } from '@angular/core';
import {
  getState,
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

const LOCAL_STORAGE_FAV = 'favorites';

type FavoritesState = {
  resource: 'books' | 'houses' | 'characters';
  isLoading: boolean;
  books: number[]; // ids
  houses: number[];
  characters: number[];
};

type FavoritesLocalStorage = {
  books: number[];
  houses: number[];
  characters: number[];
};

const initialState: FavoritesState = {
  resource: 'books',
  isLoading: false,
  books: [],
  houses: [],
  characters: [],
};

export const FavoritesStore = signalStore(
  { providedIn: 'root' }, // make it global state
  // state
  withState(initialState),
  withMethods((store) => ({
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
          };
        } else if (resource === 'houses') {
          return {
            houses: [...state.houses, resourceId].filter(
              (id) => id !== resourceId
            ),
          };
        } else if (resource === 'characters') {
          return {
            characters: [...state.characters, resourceId].filter(
              (id) => id !== resourceId
            ),
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
  })),

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
