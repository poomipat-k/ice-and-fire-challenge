import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListBookPageComponent } from './list-page/list-book-page/list-book-page.component';
import { ListCharactersPageComponent } from './list-page/list-characters-page/list-characters-page.component';
import { ListHousePageComponent } from './list-page/list-house-page/list-house-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'list',
    title: 'List page',
    redirectTo: '/list/books',
    pathMatch: 'full',
  },
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
    component: HomeComponent,
    title: 'Ice and Fire Home page',
    // redirectTo: '/list',
    // pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent },
];
