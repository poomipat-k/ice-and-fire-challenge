import { signalStore, withState } from '@ngrx/signals';
// import { Book } from '../shared/models/book';
import { Book } from '../shared/models/book-class';

type BookDetailsState = {
  book: Book;
  isLoading: boolean;
};

const initialState: BookDetailsState = {
  book: new Book(),
  isLoading: false,
};

export const BookDetailsStore = signalStore(
  // state
  withState(initialState)
);
