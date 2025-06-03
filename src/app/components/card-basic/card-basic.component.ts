import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasicCardData } from '../../shared/models/basic-card-data';

@Component({
  selector: 'app-com-card-basic',
  imports: [RouterLink],
  templateUrl: './card-basic.component.html',
  styleUrl: './card-basic.component.scss',
})
export class CardBasicComponent {
  readonly card = input<BasicCardData>();
  readonly header = input<string>();
  readonly redirectTo = input<string>(); // eg. "/books/10"
}
