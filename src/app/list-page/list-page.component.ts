import { Component } from '@angular/core';
import { CardBookComponent } from '../components/card-book/card-book.component';

@Component({
  selector: 'app-list-page',
  imports: [CardBookComponent],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent {
  // mockBooks = signal<BasicCardData[]>([
  //   [
  //     {
  //       key: 'name',
  //       val: 'A Game of Thrones',
  //     },
  //     {
  //       key: 'authors',
  //       val: [
  //         'George R. R. Martin',
  //         'George R. R. Martin',
  //         'George R. R. Martin',
  //         'George R. R. Martin',
  //         'George R. R. Martin',
  //         'George R. R. Martin',
  //         'George R. R. Martin',
  //       ],
  //     },
  //     {
  //       key: 'numberOfPages',
  //       val: 694,
  //     },
  //     {
  //       key: 'released',
  //       val: '1996-08-01T00:00:00',
  //     },
  //   ],
  //   [
  //     {
  //       key: 'name',
  //       val: 'A Clash of Kings',
  //     },
  //     {
  //       key: 'authors',
  //       val: ['George R. R. Martin'],
  //     },
  //     {
  //       key: 'numberOfPages',
  //       val: 768,
  //     },
  //     {
  //       key: 'released',
  //       val: '1999-02-02T00:00:00',
  //     },
  //   ],
  // ]);
  // mockHouses: BasicCardData[] = [];
  // mockCharacters: BasicCardData[] = [];
}
