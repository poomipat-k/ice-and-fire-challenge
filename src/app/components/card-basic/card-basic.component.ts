import { Component, input } from '@angular/core';
import { BasicCardData } from '../../shared/models/basic-card-data';

@Component({
  selector: 'app-com-card-basic',
  imports: [],
  templateUrl: './card-basic.component.html',
  styleUrl: './card-basic.component.scss',
})
export class CardBasicComponent {
  readonly card = input<BasicCardData>();
}
