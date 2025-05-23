import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListPageStore } from './list-page.store';

@Component({
  selector: 'app-list-page',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
  providers: [ListPageStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent implements OnInit {
  readonly store = inject(ListPageStore);
  readonly #injector = inject(Injector);

  ngOnInit(): void {
    const query = this.store.filter.query;
    console.log('==OnInit query: ', query());
    this.store.loadByQuery(query, { injector: this.#injector });
  }
}
