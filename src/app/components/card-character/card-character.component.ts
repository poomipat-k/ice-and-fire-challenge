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
  redirectTo = input.required<string>();
  name = input.required<string>();
  culture = input.required<string>();
  gender = input.required<string>();
  aliases = input.required<string[]>();

  header = computed(() => {
    if (this.name()) {
      return this.name();
    }
    if (this.aliases().length) {
      return this.aliases()[0];
    }
    return '-';
  });

  characterAttributes = computed<BasicCardData>(() => {
    return [
      {
        key: 'Name',
        val: this.name() || '-',
      },
      {
        key: 'Aliases',
        val: this.aliases().join(', ') || '-',
      },
      {
        key: 'Culture',
        val: this.culture() || '-',
      },
      {
        key: 'Gender',
        val: this.gender() || '-',
      },
    ];
  });
}
