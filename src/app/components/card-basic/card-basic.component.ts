import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasicCardData } from '../../shared/models/basic-card-data';
import { StarComponent } from '../svg/star/star.component';

@Component({
  selector: 'app-com-card-basic',
  imports: [RouterLink, StarComponent],
  templateUrl: './card-basic.component.html',
  styleUrl: './card-basic.component.scss',
})
export class CardBasicComponent {
  readonly card = input<BasicCardData>();
  readonly header = input<string>();
  readonly redirectTo = input<string>(); // eg. "/books/10"
  readonly fontSize = input<string>('18px');
  readonly labelMinWidth = input<string>('0');
  // readonly onFavClick = input<(e: MouseEvent) => void>();

  onFavClick(e: MouseEvent): void {
    console.log('==onFavClick e:', e);
    e.stopPropagation();
    e.preventDefault();
  }
}
