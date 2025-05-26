import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-book',
  imports: [],
  templateUrl: './details-book.component.html',
  styleUrl: './details-book.component.scss',
})
export class DetailsBookComponent implements OnInit {
  protected readonly bookId = input<string>(); // path param

  ngOnInit(): void {
    console.log('==[INIT]== bookId', Number(this.bookId()));
  }
}
