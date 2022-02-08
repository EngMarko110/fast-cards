import { StoreService } from './../../../../../../apps/ngshop/src/app/shared/services/store.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: []
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  inputSearch:string='';
  endSubs$: Subject<any> = new Subject();

  constructor(private categoriesService: CategoriesService,private storeServ:StoreService) {}

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
      this.storeServ.getInputValue().subscribe((value)=>{
        this.inputSearch=value;
      })
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
