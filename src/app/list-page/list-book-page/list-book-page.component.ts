import { Component, inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { CardBookComponent } from '../../components/card-book/card-book.component';
import { ListPageStore } from '../list-page.store';

@Component({
  selector: 'app-list-book-page',
  imports: [CardBookComponent],
  templateUrl: './list-book-page.component.html',
  styleUrl: './list-book-page.component.scss',
})
export class ListBookPageComponent implements OnInit, OnDestroy {
  readonly store = inject(ListPageStore);
  readonly #injector = inject(Injector);

  ngOnInit(): void {
    console.log('====OnInit books');
    this.store.updateQuery('');
    this.store.changeResource('books');
    const query = this.store.filter.query;
    this.store.loadBooksByQuery(query, { injector: this.#injector });
  }

  ngOnDestroy(): void {
    console.log('====ngOnDestroy books');
  }
}
