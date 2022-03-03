import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './product-routing.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductPageComponent } from './product-page/product-page.component';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductPageComponent,
    ProductItemComponent,
  ],
  exports:[
    // ProductsListComponent,
    // ProductPageComponent,
    ProductItemComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  
})
export class ProductModule { }
