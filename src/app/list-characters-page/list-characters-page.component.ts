import { Component } from '@angular/core';
import { CardCharacterComponent } from '../components/card-character/card-character.component';

@Component({
  selector: 'app-list-characters-page',
  imports: [CardCharacterComponent],
  templateUrl: './list-characters-page.component.html',
  styleUrl: './list-characters-page.component.scss',
})
export class ListCharactersPageComponent {}
