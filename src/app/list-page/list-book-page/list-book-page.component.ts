import { Component } from '@angular/core';
import { CardBookComponent } from '../../components/card-book/card-book.component';

@Component({
  selector: 'app-list-book-page',
  imports: [CardBookComponent],
  templateUrl: './list-book-page.component.html',
  styleUrl: './list-book-page.component.scss',
})
export class ListBookPageComponent {}
