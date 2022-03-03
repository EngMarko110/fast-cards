import { StoreService } from './../../../../../../../apps/ngshop/src/app/shared/services/store.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from '../../../models/category';
import { CategoriesService } from '../../../services/categories.service';
@Component({
  selector: 'bluebits-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.scss']
})
export class MainCategoryComponent implements OnInit {

  mainCategories: Category[] = [];
  inputSearch:string='';
  endSubs$: Subject<any> = new Subject();

  constructor(private categoriesService: CategoriesService,private storeServ:StoreService) {}

  ngOnInit(): void {
    this.getMainCategories();
      this.storeServ.getInputValue().subscribe((value)=>{
        this.inputSearch=value;
      })
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
  private getMainCategories(): void { 
    this.categoriesService.getMainCategories().pipe().subscribe((response) => {
      this.mainCategories = response;
    });
  }
 
}