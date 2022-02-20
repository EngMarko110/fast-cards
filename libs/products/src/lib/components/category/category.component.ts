import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '@bluebits/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../..';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'products-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  public categories: Category[] = [];
  private endsubs$: Subject<any> = new Subject();
  parentCategory: any;
  constructor(private categoriesServ: CategoriesService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((parmas) => {
      this.parentCategory = parmas.get('mainCategoryid');

      // console.log('cateId:',parmas.get('categoryid'));
      console.log('cateId type: ', this.parentCategory);
    })
  }

  ngOnInit(): void {
    this._getCategories();
  }
  public ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  private _getCategories(): void {
    this.categoriesServ.getCategories(this.parentCategory).pipe(takeUntil(this.endsubs$)).subscribe((subCats) => {
      this.categories = subCats;
      console.log(this.categories)
    });
  }
 

}
