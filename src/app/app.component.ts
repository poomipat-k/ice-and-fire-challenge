import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMobileComponent } from './components/nav-mobile/nav-mobile.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavMobileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
