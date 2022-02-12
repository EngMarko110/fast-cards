import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
//import { param } from 'jquery';
import { Category } from "../../models/category";
import { Product } from "../../models/product";
import { CategoriesService } from "../../services/categories.service";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: "products-list",
  templateUrl: "./products-list.component.html",
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean;
  subId: any;

  constructor(
    private prodService: ProductsService,
    private catService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();
    //   params.categoryid ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    // });
    this.route.paramMap.subscribe((params) => {
      this.subId = params.get("subCategoryId");
      console.log("sub id: ", this.subId);
    });
    this._getCategories();
    this._getProducts();
  }

  private _getProducts() {
    this.prodService
      .getProductsBySubCategoryId(this.subId)
      .subscribe((resProducts) => {
        this.products = resProducts;
        console.log({ resProducts });
      });
  }

  private _getCategories() {
    this.catService.getCategories().subscribe((resCats) => {
      this.categories = resCats;
    });
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);

    // this._getProducts(selectedCategories);
  }
}
