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
  name = input.required<string>();
  authors = input.required<string[]>();
  numberOfPages = input.required<number>();
  released = input.required<string | Date>();

  bookAttributes = computed<BasicCardData>(() => {
    const filtered = [];

    return [
      {
        key: 'name',
        val: this.name(),
      },
      {
        key: 'authors',
        val: this.authors(),
      },
      {
        key: 'number of pages',
        val: this.numberOfPages(),
      },
      {
        key: 'releasedDate',
        val: this.released(),
      },
    ];
  });
}
