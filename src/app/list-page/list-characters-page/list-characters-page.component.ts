import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
} from '@angular/core';

import { CardCharacterComponent } from '../../components/card-character/card-character.component';
import { CardFillEmptyComponent } from '../../components/card-fill-empty/card-fill-empty.component';
import { CardSkeletonComponent } from '../../components/card-skeleton/card-skeleton.component';
import { ListPageStore } from '../list-page.store';

@Component({
  selector: 'app-list-characters-page',
  imports: [
    CardCharacterComponent,
    CardSkeletonComponent,
    CardFillEmptyComponent,
  ],
  templateUrl: './list-characters-page.component.html',
  styleUrl: './list-characters-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCharactersPageComponent implements OnInit {
  readonly store = inject(ListPageStore);
  readonly #injector = inject(Injector);

  ngOnInit(): void {
    this.store.loadCharactersByQuery(this.store.charactersFilter, {
      injector: this.#injector,
    });
  }

  getDetailsPath(url: string): string {
    const split = url.split('anapioficeandfire.com/api');
    if (split.length < 2) {
      return '';
    }
    return split[split.length - 1];
  }
}
