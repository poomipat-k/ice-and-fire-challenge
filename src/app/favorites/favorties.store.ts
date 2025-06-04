import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Book } from '../shared/models/book';
import { Character } from '../shared/models/character';
import { House } from '../shared/models/house';

const DEFAULT_PAGE_SIZE = 50;
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
  favBooks: Book[];
  favHouses: House[];
  favCharacters: Character[];
};

const initialState: ListPageState = {
  resource: 'books',
  isLoading: false,
  favBooks: [],
  favHouses: [],
  favCharacters: [],
};

export const ListPageStore = signalStore(
  // state
  withState(initialState),
  withMethods((store) => ({
    addFavorites(path: string): void {
      if (store.resource() === 'books') {
        patchState(store, (state) => ({}));
      } else if (store.resource() === 'houses') {
      } else if (store.resource() === 'characters') {
      }
    },
    removeFavorites() {},
  }))
  // Hooks
);

// // helper functions
// function getResourceType(url: string): 'books' | 'houses' | 'characters' {
//   const resource = url.replace('/favorites/', '');
//   if (
//     resource === 'books' ||
//     resource === 'houses' ||
//     resource === 'characters'
//   ) {
//     return resource;
//   }
//   return 'books';
// }
