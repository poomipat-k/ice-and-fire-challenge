import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListPageComponent } from './list-page/list-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Ice and Fire Home page',
  },
  {
    path: 'list',
    component: ListPageComponent,
    title: 'Ice and Fire Home page',
  },
];
