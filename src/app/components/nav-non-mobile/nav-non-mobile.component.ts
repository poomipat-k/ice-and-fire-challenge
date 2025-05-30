import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ArrowDownComponent } from '../svg/arrow-down/arrow-down.component';
import { IronThroneComponent } from '../svg/iron-throne/iron-throne.component';
import { NavNonMobileStore } from './nav-non-mobile.store';

@Component({
  selector: 'app-com-nav-non-mobile',
  imports: [
    RouterLink,
    IronThroneComponent,
    ArrowDownComponent,
    CommonModule,
    RouterLinkActive,
  ],
  templateUrl: './nav-non-mobile.component.html',
  styleUrl: './nav-non-mobile.component.scss',
  providers: [NavNonMobileStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavNonMobileComponent {
  protected readonly store = inject(NavNonMobileStore);
}
