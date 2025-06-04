import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritesStore } from '../../global-states/favorites.store';
import { BasicCardData } from '../../shared/models/basic-card-data';
import { StarComponent } from '../svg/star/star.component';

@Component({
  selector: 'app-com-card-basic',
  imports: [RouterLink, StarComponent],
  templateUrl: './card-basic.component.html',
  styleUrl: './card-basic.component.scss',
})
export class CardBasicComponent {
  readonly favoritesStore = inject(FavoritesStore);

  readonly card = input<BasicCardData>();
  readonly header = input<string>();
  readonly redirectTo = input<string>(); // eg. "/books/10"
  readonly fontSize = input<string>('18px');
  readonly labelMinWidth = input<string>('0');

  readonly metaData = computed(() => {
    if (!this.redirectTo()) {
      return {
        resource: '',
        resourceId: 0,
      };
    }
    const split = this.redirectTo()?.split('/') || [];
    if (split.length !== 3) {
      return {
        resource: '',
        resourceId: 0,
      };
    }
    return {
      resource: split[1],
      resourceId: +split[2],
    };
  });

  onFavClick(e: MouseEvent): void {
    e.stopPropagation();
    e.preventDefault();

    if (!this.redirectTo()) {
      console.error('redirectTo is empty');
      return;
    }
    const path = this.redirectTo()?.replace('/', '');
    if (!path) {
      console.error(
        'onFavClick: path is not valid, input: ',
        this.redirectTo()
      );
      return;
    }
    this.favoritesStore.updateFavorites(path);
  }
}
