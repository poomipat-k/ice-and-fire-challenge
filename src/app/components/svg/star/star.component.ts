import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-com-svg-star',
  imports: [CommonModule],
  templateUrl: './star.component.html',
  styleUrl: './star.component.scss',
})
export class StarComponent {
  readonly checked = input<boolean>(false);
}
