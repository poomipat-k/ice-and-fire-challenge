import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListPageStore } from './list-page.store';

@Component({
  selector: 'app-list-page',
  imports: [RouterOutlet, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
  providers: [ListPageStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent implements OnInit, OnDestroy {
  readonly store = inject(ListPageStore);

  private readonly subs: Subscription[] = [];

  ngOnInit(): void {
    const querySub = this.store
      .queryForm()
      ?.valueChanges?.subscribe((query) => {
        console.log('===valueChanges');
        this.store.updateQuery({
          query: query || '',
          resource: this.store.resource(),
        });
      });

    this.subs.push(querySub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
