import { Component, inject, OnInit } from '@angular/core';
import { CardFillEmptyComponent } from '../components/card-fill-empty/card-fill-empty.component';
import { CardHouseComponent } from '../components/card-house/card-house.component';
import { CardSkeletonComponent } from '../components/card-skeleton/card-skeleton.component';
import { FavoritesStore } from '../global-states/favorites.store';

@Component({
  selector: 'app-favorites-houses',
  imports: [CardHouseComponent, CardSkeletonComponent, CardFillEmptyComponent],
  templateUrl: './favorites-houses.component.html',
  styleUrl: './favorites-houses.component.scss',
})
export class FavoritesHousesComponent implements OnInit {
  readonly store = inject(FavoritesStore);

  ngOnInit(): void {
    // load data on init, favorite page items can only be removed
    this.store.getFavoritesHouses().subscribe();
  }
}
