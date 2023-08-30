import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksService } from 'src/app/services/books.service';
import { MatIconModule } from '@angular/material/icon';
import { Library } from 'src/app/shared/interfaces/Books.interface';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SvgUnreaBookComponent } from '../svg-unread-book.component';

@Component({
  selector: 'app-unreaded-books',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, SvgUnreaBookComponent],
  templateUrl: './unreaded-books.component.html',
})
export class UnreadedBooksComponent {

  private serviceBooks = inject(BooksService);

  public lstUnreadBooks = computed(() => this.serviceBooks.lstUnreadBooks());

  deleteFromUnreadBooks = (item: Library):void => 
    this.serviceBooks.deleteFromUnreadBooks(item);

  addToReadedBooks = (item: Library):void => {
    this.serviceBooks.deleteFromUnreadBooks(item);
    this.serviceBooks.handleReadedBook(item);
  }
  
}
