import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type NavNonMobileState = {
  navigating: boolean;
  showFavorites: boolean;
  showList: boolean;
};

const initialState: NavNonMobileState = {
  navigating: false,
  showFavorites: false,
  showList: false,
};

export const NavNonMobileStore = signalStore(
  // state
  withState(initialState),
  withMethods((store) => ({
    stopNavigating() {
      patchState(store, {
        navigating: false,
        showFavorites: false,
        showList: false,
      });
    },
    toggleFavorites() {
      patchState(store, (state) => ({
        navigating: !state.showFavorites,
        showFavorites: !state.showFavorites,
        showList: false,
      }));
    },
    toggleList() {
      patchState(store, (state) => ({
        navigating: !state.showList,
        showList: !state.showList,
        showFavorites: false,
      }));
    },
  }))
);
