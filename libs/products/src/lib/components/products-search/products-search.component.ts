import { StoreService } from './../../../../../../apps/ngshop/src/app/shared/services/store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'products-search',
  templateUrl: './products-search.component.html',
  styles: [
  ]
})
export class ProductsSearchComponent implements OnInit {
searchInput;
  constructor(private storeServ:StoreService) { }

  ngOnInit(): void {
  }
  search(value: string): void {
    console.log({value});
    this.storeServ.setInputValue(value);
    
  }
}
