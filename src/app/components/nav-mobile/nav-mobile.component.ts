import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IronThroneComponent } from '../svg/iron-throne/iron-throne.component';
import { NavMobileStore } from './nav-mobile.store';

@Component({
  selector: 'app-com-nav-mobile',
  imports: [CommonModule, RouterLink, RouterLinkActive, IronThroneComponent],
  templateUrl: './nav-mobile.component.html',
  styleUrl: './nav-mobile.component.scss',
  providers: [NavMobileStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMobileComponent {
  protected readonly store = inject(NavMobileStore);
}
