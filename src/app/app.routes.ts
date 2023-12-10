import { Routes } from '@angular/router';
import { ListBooksComponent } from './ui/list-books/list-books.component';
import { AddBookComponent } from './ui/add-book/add-book.component';

export const routes: Routes = [
  { path: 'books', component: ListBooksComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
];
