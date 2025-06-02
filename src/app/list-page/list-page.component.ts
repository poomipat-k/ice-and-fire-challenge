import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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

  readonly searchText = new FormControl<string>('');
  private readonly subs: Subscription[] = [];

  ngOnInit(): void {
    this.store.updateQuery('');

    const querySub = this.searchText?.valueChanges?.subscribe((query) => {
      this.store.updateQuery(query || '');
    });
    this.subs.push(querySub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
