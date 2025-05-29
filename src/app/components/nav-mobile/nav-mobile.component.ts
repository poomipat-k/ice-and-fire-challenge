import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavMobileStore } from './nav-mobile.store';

@Component({
  selector: 'app-com-nav-mobile',
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-mobile.component.html',
  styleUrl: './nav-mobile.component.scss',
  providers: [NavMobileStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMobileComponent implements OnInit {
  protected readonly store = inject(NavMobileStore);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    console.log('==Nav INIT');
    this.route.url.subscribe((event) => {
      console.log(event[0]); // It's an array remember [0]
      console.log(event[0].path); // e.g. /products
      console.log(event[0].parameters); // e.g. { id: 'x8klP0' }
    });
  }
}
