import { Component, computed, input } from '@angular/core';
import { BasicCardData } from '../../shared/models/basic-card-data';
import { CardBasicComponent } from '../card-basic/card-basic.component';

@Component({
  selector: 'app-com-card-character',
  imports: [CardBasicComponent],
  templateUrl: './card-character.component.html',
  styleUrl: './card-character.component.scss',
})
export class CardCharacterComponent {
  name = input.required<string>();
  gender = input<string>('');

  characterAttributes = computed<BasicCardData>(() => {
    return [
      {
        key: 'name',
        val: this.name(),
      },
      {
        key: 'gender',
        val: this.gender(),
      },
    ];
  });
}
