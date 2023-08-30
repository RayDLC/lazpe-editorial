import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from 'src/app/services/books.service';
import { MatIconModule } from '@angular/material/icon';
import { Library } from 'src/app/shared/interfaces/Books.interface';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SvgReadBookComponent } from '../svg-read-book.component';

@Component({
  selector: 'app-readed-books',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, SvgReadBookComponent],
  templateUrl: './readed-books.component.html',
})
export class ReadedBooksComponent {

  private serviceBooks = inject(BooksService);

  public lstReadedBooks = computed(() => this.serviceBooks.lstReadedBooks());

  deleteFromReadedBooks = (item: Library):void => 
    this.serviceBooks.deleteFromReadedBooks(item);

  addToUnreadedBooks = (item: Library):void => {
    this.serviceBooks.deleteFromReadedBooks(item);
    this.serviceBooks.handleUnreadBook(item);
  }
}
