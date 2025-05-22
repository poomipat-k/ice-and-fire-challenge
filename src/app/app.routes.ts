import { Routes } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'list',
    component: ListPageComponent,
    title: 'List page',
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
