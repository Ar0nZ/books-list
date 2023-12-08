import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-add-book',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {}
