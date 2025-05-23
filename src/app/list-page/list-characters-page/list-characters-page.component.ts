import { Component, inject, Injector } from '@angular/core';
import { CardCharacterComponent } from '../../components/card-character/card-character.component';
import { ListPageStore } from '../list-page.store';

@Component({
  selector: 'app-list-characters-page',
  imports: [CardCharacterComponent],
  templateUrl: './list-characters-page.component.html',
  styleUrl: './list-characters-page.component.scss',
})
export class ListCharactersPageComponent {
  readonly store = inject(ListPageStore);
  readonly #injector = inject(Injector);

  ngOnInit(): void {
    console.log('====OnInit characters');
    this.store.updateQuery('');
    this.store.changeResource('characters');
    this.store.loadCharactersByQuery(this.store.filter.query, {
      injector: this.#injector,
    });
  }

  ngOnDestroy(): void {
    console.log('====ngOnDestroy characters');
  }
}
