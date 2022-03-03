import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Category } from '../../../';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'products-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit, OnDestroy {
  public subCategories: Category[] = [];
  private endsubs$: Subject<any> = new Subject();
  parentCategory: any;
  category: Category = {};
  constructor(private categoriesServ: CategoriesService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((parmas) => {
      this.parentCategory = parmas.get('categoryid');
    })
  }

  ngOnInit(): void {
    this._getSubCategories();
    this._getCategory();
  }
  public ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  private _getSubCategories(): void {
    this.categoriesServ.getSubCategories(this.parentCategory).pipe(takeUntil(this.endsubs$)).subscribe((subCats) => {
      this.subCategories = subCats;
    });
  }
  private _getCategory(): void {
    this.categoriesServ.getCategory(this.parentCategory).pipe(takeUntil(this.endsubs$)).subscribe((response) => {
      this.category = response;
    });
  }


}
