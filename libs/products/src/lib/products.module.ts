import { SubcategoryComponent } from './components/subcategory/subcategory.component';
import { FilterPipe } from './../../../../apps/ngshop/src/app/shared/pipes/filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersModule } from '@bluebits/orders';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@bluebits/ui';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
  {
    path: 'category/:mainCategoryid',
    component: CategoryComponent
  },
  {
    path: 'subcategory/:categoryid',
    component: SubcategoryComponent
  },
  {
    path: 'products/:subCategoryId',
    component: ProductsListComponent
  },
  {
    path: 'products/:productid',
    component: ProductPageComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OrdersModule,
    RouterModule.forChild(routes),
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RatingModule,
    InputNumberModule,
    UiModule,
   
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductPageComponent,
    SubcategoryComponent,
    CategoryComponent,
    FilterPipe
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductPageComponent
  ]
})
export class ProductsModule { }
