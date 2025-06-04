import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import { CardBookComponent } from '../../components/card-book/card-book.component';
import { CardFillEmptyComponent } from '../../components/card-fill-empty/card-fill-empty.component';
import { CardSkeletonComponent } from '../../components/card-skeleton/card-skeleton.component';
import { ListPageStore } from '../list-page.store';

@Component({
  selector: 'app-list-book-page',
  imports: [CardBookComponent, CardSkeletonComponent, CardFillEmptyComponent],
  templateUrl: './list-book-page.component.html',
  styleUrl: './list-book-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListBookPageComponent implements OnInit {
  readonly store = inject(ListPageStore);
  readonly #injector = inject(Injector);

  ngOnInit(): void {
    this.store.loadBooksByQuery(this.store.booksFilter, {
      injector: this.#injector,
    });
  }

  getDetailsPath(url: string): string {
    return url.replace('https://anapioficeandfire.com/api', '');
  }
}
