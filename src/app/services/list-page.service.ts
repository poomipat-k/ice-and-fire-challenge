import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ListPageService {
  searchText = new FormControl<string>('');
  constructor() {}
}
