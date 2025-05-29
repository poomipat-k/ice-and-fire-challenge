import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import { CardHouseComponent } from '../../components/card-house/card-house.component';
import { ListPageStore } from '../list-page.store';

@Component({
  selector: 'app-list-house-page',
  imports: [CardHouseComponent],
  templateUrl: './list-house-page.component.html',
  styleUrl: './list-house-page.component.scss',
  providers: [ListPageStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListHousePageComponent implements OnInit {
  readonly store = inject(ListPageStore);
  readonly #injector = inject(Injector);

  ngOnInit(): void {
    const query = this.store.query;
    this.store.loadHousesByQuery(query, { injector: this.#injector });
  }

  getDetailsPath(url: string): string {
    return url.replace('https://anapioficeandfire.com/api', '');
  }
}
