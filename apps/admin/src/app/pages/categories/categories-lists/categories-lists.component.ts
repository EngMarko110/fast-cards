import { Component, OnDestroy, OnInit } from "@angular/core";
import { CategoriesNames } from '@bluebits/products'
@Component({ selector: "admin-categories-lists", templateUrl: "./categories-lists.component.html", styles: [] })
export class CategoriesListsComponent implements OnInit, OnDestroy {
  public listTypes = [CategoriesNames.mainCategories, CategoriesNames.categories];
  constructor() {}
  public ngOnInit(): void {}
  public ngOnDestroy(): void {}
}
