import { Component, inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { CardHouseComponent } from '../../components/card-house/card-house.component';
import { ListPageStore } from '../list-page.store';

@Component({
  selector: 'app-list-house-page',
  imports: [CardHouseComponent],
  templateUrl: './list-house-page.component.html',
  styleUrl: './list-house-page.component.scss',
})
export class ListHousePageComponent implements OnInit, OnDestroy {
  readonly store = inject(ListPageStore);
  readonly #injector = inject(Injector);

  ngOnInit(): void {
    console.log('====OnInit houses');
    const query = this.store.filter.query;
    this.store.loadHousesByQuery(query, { injector: this.#injector });
  }

  ngOnDestroy(): void {
    console.log('====ngOnDestroy houses');
  }
}
