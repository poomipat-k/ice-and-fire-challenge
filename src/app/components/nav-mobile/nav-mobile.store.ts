import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type NavMobileState = {
  displayMenu: boolean;
};

const initialState: NavMobileState = {
  displayMenu: false,
};

export const NavMobileStore = signalStore(
  // state
  withState(initialState),
  withMethods((store) => ({
    toggleNav() {
      patchState(store, (state) => ({
        displayMenu: !state.displayMenu,
      }));
    },
    closeNav() {
      patchState(store, { displayMenu: false });
    },
  }))
);
