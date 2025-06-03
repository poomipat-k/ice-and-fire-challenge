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
  redirectTo = input.required<string>();
  name = input.required<string>();
  region = input.required<string>();
  words = input.required<string>();
  seats = input.required<string[]>();

  houseAttributes = computed<BasicCardData>(() => {
    let seats = this.seats().join(', ');
    return [
      {
        key: 'Region',
        val: this.region() || '-',
      },
      {
        key: 'Words',
        val: this.words() || '-',
      },
      {
        key: 'Seats',
        val: seats || '-',
      },
    ];
  });
}
