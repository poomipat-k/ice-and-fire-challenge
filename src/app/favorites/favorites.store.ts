import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

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
    updateFavorites(path: string): void {},

    _addFavorites(path: string): void {
      if (store.resource() === 'books') {
        patchState(store, (state) => ({}));
      } else if (store.resource() === 'houses') {
      } else if (store.resource() === 'characters') {
      }
    },
    _removeFavorites() {},

    _shouldAdd(path: string): boolean {
      const [resource, id] = path.split('/');
      if (!resource || !id) {
        console.error('[_shouldAdd] path invalid, input:', path);
        return false;
      }
      if (
        resource === 'books' ||
        resource === 'houses' ||
        resource === 'characters'
      ) {
        return !store[resource]()?.find((s) => s === +id);
      } else {
        console.error('[_shouldAdd] resource invalid, input:', path);
        return false;
      }
    },
  })),

  withHooks({
    onInit(store) {
      const favoritesLc = localStorage.getItem('favorites');
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
        localStorage.setItem('favorites', JSON.stringify(newFavorites));

        patchState(store, {
          books: [],
          houses: [],
          characters: [],
        });
      }

      console.log('==INIT finished');
    },
  })
);
