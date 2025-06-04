import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { StarComponent } from '../components/svg/star/star.component';
import { FavoritesStore } from '../global-states/favorites.store';
import { BookDetailsStore } from './book-details.store';

@Component({
  selector: 'app-details-book',
  imports: [StarComponent],
  templateUrl: './details-book.component.html',
  styleUrl: './details-book.component.scss',
  providers: [BookDetailsStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsBookComponent implements OnInit {
  protected readonly bookId = input.required<string>(); // path param
  readonly store = inject(BookDetailsStore);
  readonly favStore = inject(FavoritesStore);

  ngOnInit(): void {
    const id = Number(this.bookId());
    this.store.loadById(id);
  }
}
