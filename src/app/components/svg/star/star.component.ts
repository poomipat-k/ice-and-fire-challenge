import { Component, input } from '@angular/core';

@Component({
  selector: 'app-com-svg-star',
  imports: [],
  templateUrl: './star.component.html',
  styleUrl: './star.component.scss',
})
export class StarComponent {
  readonly checked = input<boolean>(false);
}
