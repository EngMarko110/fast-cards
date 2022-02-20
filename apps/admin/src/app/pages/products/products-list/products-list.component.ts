import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
  @Input() private mainCategory: string;
  @Input() private category: string;
  @Input() private subCategory: string;
  products = [];
  endsubs$: Subject<any> = new Subject();
  searchText;
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getProducts() {
    if (this.subCategory) this.productsService.getProductsBySubId(this.subCategory).pipe(takeUntil(this.endsubs$)).subscribe((products) => this.products = products);
    else {
      this.productsService
      .getProducts()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((products) => {
        this.products = products;
        console.log({products})
      });
    }
  }

  updateOrGetProduct(productid: string, isReadOnly: string) {
    this.router.navigateByUrl(`products/form/${productid}/${isReadOnly}`);
  }
  createProduct() {
    if (this.mainCategory && this.category && this.subCategory) this.router.navigateByUrl(`products/form/${this.mainCategory}/${this.category}/${this.subCategory}`);
    this.router.navigateByUrl(`products/form`);
  }
  createLicense(productId: string) { this.router.navigateByUrl(`licenses/${productId}/form`); }
  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService
          .deleteProduct(productId)
          .pipe(takeUntil(this.endsubs$))
          .subscribe(
            () => {
              this._getProducts();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Product is deleted!'
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Product is not deleted!'
              });
            }
          );
      }
    });
  }
}
