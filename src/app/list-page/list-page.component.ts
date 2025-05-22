import { Component } from '@angular/core';
import { CardBookComponent } from '../components/card-book/card-book.component';
import { CardCharacterComponent } from '../components/card-character/card-character.component';
import { CardHouseComponent } from '../components/card-house/card-house.component';

@Component({
  selector: 'app-list-page',
  imports: [CardBookComponent, CardHouseComponent, CardCharacterComponent],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent {}
