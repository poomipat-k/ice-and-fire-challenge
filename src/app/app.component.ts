import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMobileComponent } from './components/nav-mobile/nav-mobile.component';
import { NavNonMobileComponent } from './components/nav-non-mobile/nav-non-mobile.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavMobileComponent, NavNonMobileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
