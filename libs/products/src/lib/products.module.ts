import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersModule } from '@bluebits/orders';
import { FilterPipe } from './../../../../apps/ngshop/src/app/shared/pipes/filter.pipe';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/products/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@bluebits/ui';
import { MainCategoryComponent } from './components/categories/main-category/main-category.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { SubcategoryComponent } from './components/categories/subcategory/subcategory.component';
import { ProductModule } from './components/products/product.module';

const routes: Routes = [
  {
    path: 'subcategory/:categoryid',
    component: SubcategoryComponent
  },
  {
    path: 'products', loadChildren: () => import('./components/products/product.module')
      .then(m => m.ProductModule),

  },

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
    ProductModule

  ],
  declarations: [
    ProductsSearchComponent,
    FeaturedProductsComponent,
    FilterPipe,
    MainCategoryComponent,
    CategoryComponent,
    SubcategoryComponent,
  ],
  exports: [
    ProductsSearchComponent,
    MainCategoryComponent,
    FeaturedProductsComponent,
    
  ]
})
export class ProductsModule { }
