import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '@bluebits/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubCategory } from '../../..';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'products-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit, OnDestroy {
  subList: any[];
  private endsubs$: Subject<any> = new Subject();
  parentCategory: any;
  constructor(private categoriesServ: CategoriesService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((parmas) => {
      this.parentCategory = parmas.get('categoryid');

      // console.log('cateId:',parmas.get('categoryid'));
      console.log('cateId type: ', typeof (this.parentCategory));
    })
  }

  ngOnInit(): void {
    this.getSubcategory();
  }
  public ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  getSubcategory() {
    // this.categoriesServ.getSubCategories(this.cateId).subscribe((response) => {
    //   this.subList = response;
    //   console.log({response});
    // },
    // err=>{
    //   // 61e973bb457163cc6b9c644c
    //   console.log({err});
    // this.categoriesServ.getSubCategories(this.parentCategory).
    //   pipe(takeUntil(this.endsubs$)).subscribe((subCats) => {
    //     this.subList = subCats;
    //     console.log({ subCats });
    //   },
    //     err => console.log({ err }));
  }

}
