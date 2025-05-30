import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import { CardCharacterComponent } from '../../components/card-character/card-character.component';
import { ListPageStore } from '../list-page.store';

@Component({
  selector: 'app-list-characters-page',
  imports: [CardCharacterComponent],
  templateUrl: './list-characters-page.component.html',
  styleUrl: './list-characters-page.component.scss',
  providers: [ListPageStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCharactersPageComponent implements OnInit {
  readonly store = inject(ListPageStore);
  readonly #injector = inject(Injector);

  ngOnInit(): void {
    this.store.updateQuery('');
    this.store.changeResource('characters');
    this.store.loadCharactersByQuery(this.store.query, {
      injector: this.#injector,
    });
  }

  getDetailsPath(url: string): string {
    return url.replace('https://anapioficeandfire.com/api', '');
  }
}
