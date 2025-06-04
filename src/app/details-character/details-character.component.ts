import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExternalLinkComponent } from '../components/svg/external-link/external-link.component';
import { StarComponent } from '../components/svg/star/star.component';
import { FavoritesStore } from '../global-states/favorites.store';
import { CharacterDetailsStore } from './character-details.store';

@Component({
  selector: 'app-details-character',
  imports: [RouterLink, ExternalLinkComponent, StarComponent],
  templateUrl: './details-character.component.html',
  styleUrl: './details-character.component.scss',
  providers: [CharacterDetailsStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsCharacterComponent implements OnInit {
  protected readonly characterId = input.required<string>(); // path param
  readonly store = inject(CharacterDetailsStore);
  readonly favStore = inject(FavoritesStore);

  ngOnInit(): void {
    const id = Number(this.characterId());
    this.store.loadById(id);
  }
}
