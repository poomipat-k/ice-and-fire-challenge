import { Component, inject, OnInit } from '@angular/core';
import { CardCharacterComponent } from '../components/card-character/card-character.component';
import { CardFillEmptyComponent } from '../components/card-fill-empty/card-fill-empty.component';
import { CardSkeletonComponent } from '../components/card-skeleton/card-skeleton.component';
import { FavoritesStore } from '../global-states/favorites.store';

@Component({
  selector: 'app-favorites-characters',
  imports: [
    CardCharacterComponent,
    CardSkeletonComponent,
    CardFillEmptyComponent,
  ],
  templateUrl: './favorites-characters.component.html',
  styleUrl: './favorites-characters.component.scss',
})
export class FavoritesCharactersComponent implements OnInit {
  readonly store = inject(FavoritesStore);

  ngOnInit(): void {
    // load data on init, favorite page items can only be removed
    this.store.getFavoritesCharacters().subscribe();
  }
}
