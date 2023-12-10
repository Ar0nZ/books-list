import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
// import { Book } from '../../models/book.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-add-book',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {
  private bookService: BooksService = inject(BooksService);
  private formBuilder = inject(FormBuilder);

  bookForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    releaseDate: ['', Validators.required],
  });

  formSubmit(): void {
    if (this.bookForm.valid) {
      const formattedBook = {
        ...this.bookForm.value,
        releaseDate: this.bookForm.value.releaseDate.toISOString(),
      };
      this.bookService.addBook(formattedBook);
    }
  }
}
