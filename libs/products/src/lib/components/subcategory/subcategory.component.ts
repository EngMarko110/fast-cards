import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '@bluebits/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../..';
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
  constructor(private categoriesServ: CategoriesService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((parmas) => {
      this.parentCategory = parmas.get('categoryid');

      // console.log('cateId:',parmas.get('categoryid'));
      console.log('cateId type: ', this.parentCategory);
    })
  }

  ngOnInit(): void {
    this._getSubCategories();
  }
  public ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  private _getSubCategories(): void {
    this.categoriesServ.getSubCategories(this.parentCategory).pipe(takeUntil(this.endsubs$)).subscribe((subCats) => {
      this.subCategories = subCats;
      console.log(this.subCategories)
    });
  }
 

}
