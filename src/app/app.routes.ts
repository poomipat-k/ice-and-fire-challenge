import { Routes } from '@angular/router';
import { DetailsBookComponent } from './details-book/details-book.component';
import { DetailsCharacterComponent } from './details-character/details-character.component';
import { DetailsHouseComponent } from './details-house/details-house.component';
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
      {
        path: 'books',
        component: ListBookPageComponent,
        title: 'Books - Ice and Fire books',
      },
      {
        path: 'houses',
        component: ListHousePageComponent,
        title: 'Houses - Ice and Fire houses',
      },
      {
        path: 'characters',
        component: ListCharactersPageComponent,
        title: 'Characters - Ice and Fire characters',
      },
    ],
  },
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
