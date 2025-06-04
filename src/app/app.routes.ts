import { Routes } from '@angular/router';
import { DetailsBookComponent } from './details-book/details-book.component';
import { DetailsCharacterComponent } from './details-character/details-character.component';
import { DetailsHouseComponent } from './details-house/details-house.component';
import { FavoritesCharactersComponent } from './favorites-characters/favorites-characters.component';
import { FavoritesHousesComponent } from './favorites-houses/favorites-houses.component';

import { FavoritesBooksComponent } from './favorites-books/favorites-books.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  // list
  {
    path: 'list',
    title: 'List page',
    redirectTo: '/list/books',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./list-page/list-page.component').then(
        (mod) => mod.ListPageComponent
      ),
    title: 'List ',
    children: [
      {
        path: 'books',
        loadComponent: () =>
          import('./list-page/list-book-page/list-book-page.component').then(
            (mod) => mod.ListBookPageComponent
          ),
        title: 'Books - Ice and Fire',
      },
      {
        path: 'houses',
        loadComponent: () =>
          import('./list-page/list-house-page/list-house-page.component').then(
            (mod) => mod.ListHousePageComponent
          ),
        title: 'Houses - Ice and Fire',
      },
      {
        path: 'characters',
        loadComponent: () =>
          import(
            './list-page/list-characters-page/list-characters-page.component'
          ).then((mod) => mod.ListCharactersPageComponent),
        title: 'Characters - Ice and Fire',
      },
    ],
  },
  // favorites
  {
    path: 'favorites/books',
    component: FavoritesBooksComponent,
    title: 'Favorites books',
  },
  {
    path: 'favorites/houses',
    component: FavoritesHousesComponent,
    title: 'Favorites houses',
  },
  {
    path: 'favorites/characters',
    component: FavoritesCharactersComponent,
    title: 'Favorites characters',
  },
  // details
  {
    path: 'books/:bookId',
    component: DetailsBookComponent,
    title: 'Book details',
  },
  {
    path: 'houses/:houseId',
    component: DetailsHouseComponent,
    title: 'House details',
  },
  {
    path: 'characters/:characterId',
    component: DetailsCharacterComponent,
    title: 'Character details',
  },
  {
    path: '',
    component: HomeComponent,
    title: 'Ice and Fire Home page',
  },
  { path: '**', component: PageNotFoundComponent },
];
