import { inject } from '@angular/core';
import { Event, NavigationEnd, Router, RouterEvent } from '@angular/router';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { filter } from 'rxjs';

type NavNonMobileState = {
  navigating: boolean;
  showFavorites: boolean;
  showList: boolean;
  favActive: boolean;
  listActive: boolean;
};

const initialState: NavNonMobileState = {
  navigating: false,
  showFavorites: false,
  showList: false,
  favActive: false,
  listActive: false,
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
  })),
  withHooks({
    onInit(store, router = inject(Router)) {
      // Check navbar active from current url path
      router.events
        .pipe(
          filter(
            (e: Event | RouterEvent): e is RouterEvent =>
              e instanceof RouterEvent && e instanceof NavigationEnd
          )
        )
        .subscribe((e: RouterEvent) => {
          patchState(store, {
            favActive: e.url.startsWith('/favorites/'),
            listActive: e.url.startsWith('/list/'),
          });
        });
    },
  })
);
