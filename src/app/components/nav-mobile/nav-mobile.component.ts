import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavMobileStore } from './nav-mobile.store';

@Component({
  selector: 'app-com-nav-mobile',
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-mobile.component.html',
  styleUrl: './nav-mobile.component.scss',
  providers: [NavMobileStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMobileComponent {
  protected readonly store = inject(NavMobileStore);
}
