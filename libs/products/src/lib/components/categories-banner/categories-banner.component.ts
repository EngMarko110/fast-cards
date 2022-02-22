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
  mainCategories: Category[] = [];
  categories: Category[] = [];
  response: any[] = [];
  inputSearch:string='';
  endSubs$: Subject<any> = new Subject();

  constructor(private categoriesService: CategoriesService,private storeServ:StoreService) {}

  ngOnInit(): void {
    this.getMainCategories();
    this.categoriesService
      .getMainCategories()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((categories) => {
        this.mainCategories = categories;
        for (const mainCategory of this.mainCategories) {
          const categoriesForMainCategory = this.categories.filter((category) => category.mainCategory === mainCategory.id);
          const categoriesObj = this.categoriesMapper(categoriesForMainCategory, mainCategory);
          this.response.push(categoriesObj);
        }
      });
      this.storeServ.getInputValue().subscribe((value)=>{
        this.inputSearch=value;
      })
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
  private getMainCategories(): void {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe((subCats) => {
      this.categories = subCats;
    });
  }
  private categoriesMapper(categories: Category[], mainCategory: Category): any {
    const mappedCategories = { name: mainCategory.name, categories };
    return mappedCategories;
  }
}
