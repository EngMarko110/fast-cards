import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LicensesService, License } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({ selector: 'admin-licenses-list', templateUrl: './licenses-list.component.html', styles: [] })
export class LicensesListComponent implements OnInit, OnDestroy {
  public searchText;
  public licenses: License[] = [];
  private productId: string;
  private endsubs$: Subject<any> = new Subject();
  constructor(private licensesService: LicensesService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService, private route: ActivatedRoute) {}
  public ngOnInit(): void { this._getLicenses(this.productId); }
  public ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  private _getLicenses(productId: string): void {
    this.licensesService.getLicenses(productId).pipe(takeUntil(this.endsubs$)).subscribe((licenses) => this.licenses = licenses);
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
          this._getLicenses(this.productId);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'License is deleted!' });
        }, () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'License is not deleted!' }));
      }
    });
  }
}
