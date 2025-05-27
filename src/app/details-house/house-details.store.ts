import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { HousesService } from '../services/houses.service';
import { House } from '../shared/models/house';

type HouseDetailsState = {
  house: House;
  isLoading: boolean;
};

const initialState: HouseDetailsState = {
  house: {
    url: '',
    name: '',
    region: '',
    coatOfArms: '',
    words: '',
    titles: [],
    seats: [],
    currentLord: '',
    heir: '',
    overlord: '',
    founded: '',
    founder: '',
    diedOut: '',
    ancestralWeapons: [],
    cadetBranches: [],
    swornMembers: [],
  },
  isLoading: false,
};

export const HouseDetailsStore = signalStore(
  // state
  withState(initialState),
  withMethods((store, housesService = inject(HousesService)) => ({
    loadById: rxMethod<number>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return housesService.getById(id).pipe(
            tapResponse({
              next: (house) => {
                console.log('===house: ', house);
                patchState(store, {
                  house: house,
                  isLoading: false,
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
  }))
);
