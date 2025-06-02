import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import { CardBookComponent } from '../../components/card-book/card-book.component';
import { ListPageStore } from '../list-page.store';

@Component({
  selector: 'app-list-book-page',
  imports: [CardBookComponent],
  templateUrl: './list-book-page.component.html',
  styleUrl: './list-book-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListBookPageComponent implements OnInit {
  readonly store = inject(ListPageStore);
  readonly #injector = inject(Injector);

  ngOnInit(): void {
    const query = this.store.query;
    this.store.loadBooksByQuery(query, { injector: this.#injector });
  }

  getDetailsPath(url: string): string {
    return url.replace('https://anapioficeandfire.com/api', '');
  }
}
