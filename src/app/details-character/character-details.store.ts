import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { CharactersService } from '../services/characters.service';
import { Character } from '../shared/models/character';

type CharacterDetailsState = {
  character: Character;
  isLoading: boolean;
};

const initialState: CharacterDetailsState = {
  character: {
    url: '',
    name: '',
    gender: '',
    culture: '',
    born: '',
    died: '',
    titles: [],
    aliases: [],
    father: '',
    mother: '',
    spouse: '',
    allegiances: [],
    books: [],
    povBooks: [],
    tvSeries: [],
    playedBy: [],
  },
  isLoading: false,
};

export const CharacterDetailsStore = signalStore(
  // state
  withState(initialState),
  withMethods(
    (
      store,
      charactersService = inject(CharactersService),
      titleService = inject(Title)
    ) => ({
      trimBaseUrl(url: string): string {
        const split = url.split('anapioficeandfire.com/api/');
        if (split.length < 2) {
          return '';
        }
        return split[split.length - 1];
      },
      loadById: rxMethod<number>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((id) => {
            return charactersService.getById(id).pipe(
              tapResponse({
                next: (character) => {
                  console.log('===character: ', character);
                  titleService.setTitle(
                    `Character - ${character.aliases[0] || character.name}`
                  );
                  patchState(store, {
                    character: character,
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
    })
  )
);
