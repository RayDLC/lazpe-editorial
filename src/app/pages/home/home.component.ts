import { Component, ElementRef, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PATHS_NAVBAR } from '../../shared/constants'
import BooksComponent from '../../components/books/books.component';
import { MatIconModule } from '@angular/material/icon';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BooksComponent, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export default class HomeComponent {

  public paths = PATHS_NAVBAR;
  private elementRef = inject(ElementRef);
  private serviceBooks = inject(BooksService);

  constructor() { 
    localStorage.setItem('last_path', this.actual_path())
  }

  public actual_path = computed<string>(() => this.serviceBooks.actual_path());

  handleClickItem = (path: string):void => {
    this.serviceBooks.actual_path.set(path);
    this.serviceBooks.actualBook.set(null);
    const elementBase: HTMLElement = this.elementRef.nativeElement.querySelector(`#principal-content`);
    const elementToScroll = this.elementRef.nativeElement.querySelector(`#${path}`);
    const left = path === 'explorar' ? (elementToScroll.offsetLeft - 20) : (elementToScroll.offsetLeft + 20);
    window.scroll({ top: elementBase.offsetTop, left: left, behavior: 'smooth'});

  } 

}
