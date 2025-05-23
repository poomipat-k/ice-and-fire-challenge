import { Component } from '@angular/core';
import { CardHouseComponent } from '../components/card-house/card-house.component';

@Component({
  selector: 'app-list-house-page',
  imports: [CardHouseComponent],
  templateUrl: './list-house-page.component.html',
  styleUrl: './list-house-page.component.scss',
})
export class ListHousePageComponent {}
