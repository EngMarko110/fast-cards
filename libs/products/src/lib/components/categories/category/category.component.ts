import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Category, CategoriesService } from '../../../..';
import { StoreService } from '../../../../../../../apps/ngshop/src/app/shared/services/store.service';

@Component({
  selector: 'bluebits-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
@Input() maincategoryID:string;
categories: Category[] = [];
inputSearch:string='';

constructor(private categoriesService: CategoriesService,private storeServ:StoreService) {}

ngOnInit(): void {
  this.getMainCategories();
    this.storeServ.getInputValue().subscribe((value)=>{
      this.inputSearch=value;
    })
}


private getMainCategories(): void { 
  this.categoriesService.getCategories(this.maincategoryID).pipe().subscribe((response) => {
    this.categories = response;
  });
}

}