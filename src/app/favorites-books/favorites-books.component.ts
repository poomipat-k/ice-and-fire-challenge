import { Component, inject, OnInit } from '@angular/core';
import { CardBookComponent } from '../components/card-book/card-book.component';
import { CardFillEmptyComponent } from '../components/card-fill-empty/card-fill-empty.component';
import { CardSkeletonComponent } from '../components/card-skeleton/card-skeleton.component';
import { FavoritesStore } from '../global-states/favorites.store';

@Component({
  selector: 'app-favorites-books',
  imports: [CardBookComponent, CardSkeletonComponent, CardFillEmptyComponent],
  templateUrl: './favorites-books.component.html',
  styleUrl: './favorites-books.component.scss',
})
export class FavoritesBooksComponent implements OnInit {
  readonly store = inject(FavoritesStore);

  ngOnInit(): void {
    // load data on init, favorite page items can only be removed
    this.store.getFavoritesBooks().subscribe();
  }
}
