import { Component, computed, input } from '@angular/core';
import { BasicCardData } from '../../shared/models/basic-card-data';
import { CardBasicComponent } from '../card-basic/card-basic.component';

@Component({
  selector: 'app-com-card-book',
  imports: [CardBasicComponent],
  templateUrl: './card-book.component.html',
  styleUrl: './card-book.component.scss',
})
export class CardBookComponent {
  redirectTo = input.required<string>();
  name = input.required<string>();
  authors = input.required<string[]>();
  numberOfPages = input.required<number>();
  released = input.required<string>();
  isbn = input.required<string>();

  bookAttributes = computed<BasicCardData>(() => {
    const released = new Date(this.released());
    const releasedStr = released.toLocaleDateString('en-UK', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
    return [
      {
        key: 'Authors',
        val: this.authors(),
      },
      {
        key: 'Released',
        val: releasedStr,
      },
      {
        key: 'Number of pages',
        val: this.numberOfPages().toLocaleString(),
      },
      {
        key: 'ISBN',
        val: this.isbn(),
      },
    ];
  });
}
