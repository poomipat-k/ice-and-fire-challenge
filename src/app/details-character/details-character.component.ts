import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExternalLinkComponent } from '../components/svg/external-link/external-link.component';
import { CharacterDetailsStore } from './character-details.store';

@Component({
  selector: 'app-details-character',
  imports: [RouterLink, ExternalLinkComponent],
  templateUrl: './details-character.component.html',
  styleUrl: './details-character.component.scss',
  providers: [CharacterDetailsStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsCharacterComponent implements OnInit {
  protected readonly characterId = input<string>(); // path param
  readonly store = inject(CharacterDetailsStore);

  ngOnInit(): void {
    const id = Number(this.characterId());
    this.store.loadById(id);
  }
}
