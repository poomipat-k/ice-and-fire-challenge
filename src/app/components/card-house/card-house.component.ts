import { Component, computed, input } from '@angular/core';
import { BasicCardData } from '../../shared/models/basic-card-data';
import { CardBasicComponent } from '../card-basic/card-basic.component';

@Component({
  selector: 'app-com-card-house',
  imports: [CardBasicComponent],
  templateUrl: './card-house.component.html',
  styleUrl: './card-house.component.scss',
})
export class CardHouseComponent {
  name = input.required<string>();
  region = input.required<string>();

  houseAttributes = computed<BasicCardData>(() => {
    return [
      {
        key: 'name',
        val: this.name(),
      },
      {
        key: 'region',
        val: this.region(),
      },
    ];
  });
}
