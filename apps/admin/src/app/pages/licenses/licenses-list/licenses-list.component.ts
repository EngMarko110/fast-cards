import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LicensesService, License, Product, ProductsService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({ selector: 'admin-licenses-list', templateUrl: './licenses-list.component.html', styles: [] })
export class LicensesListComponent implements OnInit, OnDestroy {
  private endsubs$: Subject<any> = new Subject();
  private product: Product;
  @Input() private productId: string;
  @Input() public soldLicence: string[];
  public searchText;
  public licenses: License[] = [];
  constructor(private licensesService: LicensesService, private productsService: ProductsService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private route: ActivatedRoute) {}
  public ngOnInit(): void {
    this._getLicenses();
    this._getProduct();
  }
  public ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  public updateLicense(licenseId: string): void { this.router.navigateByUrl(`licenses/form/${this.productId}/${licenseId}`); }
  public createLicense(): void { this.router.navigateByUrl(`licenses/form/${this.productId}`); }
  public deleteLicense(licenseId: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this License?',
      header: 'Delete License',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.licensesService.deleteLicense(licenseId).pipe(takeUntil(this.endsubs$)).subscribe(() => {
          const availableLicence = this.product.availableLicence;
          const soldLicence = this.product.soldLicence;
          if (availableLicence.includes(licenseId)) this.product.availableLicence = availableLicence.filter((key) => key !== licenseId);
          if (soldLicence.includes(licenseId)) this.product.soldLicence = soldLicence.filter((key) => key !== licenseId);
          this.productsService.updateProduct(this.product, this.product.id).pipe(takeUntil(this.endsubs$)).subscribe((product: Product) => {
            if (product) {
              this._getLicenses();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'License is deleted!' });
            }
          });
        }, () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'License is not deleted!' }));
      }
    });
  }
  private _getLicenses(): void {
    this.licensesService.getLicenses(this.productId).pipe(takeUntil(this.endsubs$)).subscribe((licenses) => this.licenses = licenses);
  }
  private _getProduct(): void {
    this.productsService.getProduct(this.productId).pipe(takeUntil(this.endsubs$)).subscribe((product) => { this.product = product});
  }
}
