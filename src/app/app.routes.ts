import { Routes } from '@angular/router';
import { ListBookPageComponent } from './list-book-page/list-book-page.component';
import { ListCharactersPageComponent } from './list-characters-page/list-characters-page.component';
import { ListHousePageComponent } from './list-house-page/list-house-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'list',
    component: ListPageComponent,
    title: 'List page',
    children: [
      { path: 'books', component: ListBookPageComponent },
      { path: 'houses', component: ListHousePageComponent },
      { path: 'characters', component: ListCharactersPageComponent },
    ],
  },
  {
    path: '',
    // component: HomeComponent,
    title: 'Ice and Fire Home page',
    redirectTo: '/list',
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent },
];
