import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  searchInput = new Subject<string>();
  constructor() { }
  setInputValue(value: string) {
    this.searchInput.next(value);
  }
  getInputValue() {
    return this.searchInput;
  }
}
