import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { LicensesService, License, ProductsService, Product } from "@bluebits/products";
import { MessageService } from "primeng/api";
import { Subject, timer } from "rxjs";
import { takeUntil } from "rxjs/operators";
@Component({ selector: "admin-licenses-form", templateUrl: "./licenses-form.component.html", styles: [] })
export class LicensesFormComponent implements OnInit, OnDestroy {
  private endsubs$: Subject<any> = new Subject();
  private product: Product;
  public editmode = false;
  public form: FormGroup;
  public isSubmitted = false;
  public currentProductId: string;
  public currentLicenseId: string;
  constructor(private formBuilder: FormBuilder, private licensesService: LicensesService, private productsService: ProductsService, private messageService: MessageService, private location: Location, private route: ActivatedRoute) {}
  public ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
  }
  public ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  public onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const licenseRequest: License = { id: this.currentLicenseId, product: this.currentProductId, code: this.licenseForm.code.value };
    if (this.editmode) this._updateLicense(licenseRequest);
    else this._addLicense(licenseRequest);
  }
  public onCancle(): void { this.location.back(); }
  public _addLicense(licenseData: License): void {
    this.licensesService.createLicense(licenseData).pipe(takeUntil(this.endsubs$)).subscribe((license: License) => {
      if (license) {
        if (!this.product.availableLicence.includes(license.id) && !license.sold) {
          this.product.availableLicence.push(license.id);
          this.productsService.updateProduct(this.product, this.product.id).pipe(takeUntil(this.endsubs$)).subscribe((product: Product) => {
            if (product) {
              this.messageService.add({ severity: "success", summary: "Success", detail: `License is created with code ${license.code}!` });
              timer(2000).toPromise().then(() => this.location.back());
            }
          });
        } else this.messageService.add({ severity: "error", summary: "Error", detail: "License is already exists or sold!" });
      }
    }, () => this.messageService.add({ severity: "error", summary: "Error", detail: "License is not created!" }));
  }
  public _updateLicense(licenseData: License): void {
    this.licensesService.updateLicense(licenseData).pipe(takeUntil(this.endsubs$)).subscribe(() => {
      this.messageService.add({ severity: "success", summary: "Success", detail: "License is updated!" });
      timer(2000).toPromise().then(() => this.location.back());
    }, () => this.messageService.add({ severity: "error", summary: "Error", detail: "License is not updated!" }));
  }
  private _initForm(): void { this.form = this.formBuilder.group({ code: ["", Validators.required] }); }
  private _checkEditMode(): void {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params.productId) {
        this.currentProductId = params.productId;
        this.productsService.getProduct(this.currentProductId).pipe(takeUntil(this.endsubs$)).subscribe((product) => {
          this.product = product;
          if (params.id) {
            this.editmode = true;
            this.currentLicenseId = params.id;
            this.licensesService.getLicense(this.currentLicenseId).pipe(takeUntil(this.endsubs$)).subscribe((license) => {
              this.licenseForm.code.setValue(license.code);
            });
          }
        });
      }
    });
  }
  get licenseForm() { return this.form.controls; }
}
