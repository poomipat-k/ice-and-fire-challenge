import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { BookDetailsStore } from './book-details.store';

@Component({
  selector: 'app-details-book',
  imports: [],
  templateUrl: './details-book.component.html',
  styleUrl: './details-book.component.scss',
  providers: [BookDetailsStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsBookComponent implements OnInit {
  protected readonly bookId = input<string>(); // path param
  readonly store = inject(BookDetailsStore);

  ngOnInit(): void {
    const id = Number(this.bookId());
    this.store.loadById(id);
  }
}
