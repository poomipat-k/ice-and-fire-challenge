import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExternalLinkComponent } from '../components/svg/external-link/external-link.component';
import { HouseDetailsStore } from './house-details.store';

@Component({
  selector: 'app-details-house',
  imports: [RouterLink, ExternalLinkComponent],
  templateUrl: './details-house.component.html',
  styleUrl: './details-house.component.scss',
  providers: [HouseDetailsStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsHouseComponent implements OnInit {
  protected readonly houseId = input<string>(); // path param
  readonly store = inject(HouseDetailsStore);

  ngOnInit(): void {
    const id = Number(this.houseId());
    this.store.loadById(id);
  }
}
