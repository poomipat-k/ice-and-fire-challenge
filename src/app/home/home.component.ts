import { Component } from '@angular/core';
import { CardBasicComponent } from '../components/card-basic/card-basic.component';

@Component({
  selector: 'app-home',
  imports: [CardBasicComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
