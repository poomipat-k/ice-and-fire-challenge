import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type NavMobileState = {
  displayMenu: boolean;
  showFavorites: boolean;
  showList: boolean;
};

const initialState: NavMobileState = {
  displayMenu: false,
  showFavorites: false,
  showList: false,
};

export const NavMobileStore = signalStore(
  // state
  withState(initialState),
  withMethods((store, router = inject(Router)) => ({
    toggleNav() {
      patchState(store, (state) => {
        if (!state.displayMenu) {
          return {
            displayMenu: !state.displayMenu,
            showFavorites: router.url.startsWith('/favorites/') ? true : false,
            showList: router.url.startsWith('/list/') ? true : false,
          };
        }
        return {
          displayMenu: !state.displayMenu,
          showFavorites: false,
          showList: false,
        };
      });
    },
    closeNav() {
      patchState(store, { displayMenu: false });
    },
    toggleFavorites() {
      patchState(store, (state) => ({
        showFavorites: !state.showFavorites,
        showList: false,
      }));
    },
    toggleList() {
      patchState(store, (state) => ({
        showList: !state.showList,
        showFavorites: false,
      }));
    },
  }))
);
